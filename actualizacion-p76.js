(function actualizarP76(){
  if(window.p76UpdateInstalled)return;
  window.p76UpdateInstalled=true;
  const style=document.createElement('style');
  style.textContent=`
html,body,main,header,.panel,.board,.stage,input,select{background:#000!important}
#possname0,#possname1{display:none!important}
.team .stats{top:280px!important}
.shot-box.expired{box-shadow:none}
.shot-box.p76-shot-alarm{animation:p76Shot .8s steps(1,end) infinite}
@keyframes p76Shot{0%,100%{background:#ff1739;color:white;border-color:white}50%{background:#fff;color:#d00020;border-color:#ff1739}}
#p76-period-alarm{display:none;position:fixed;inset:0;z-index:9999;pointer-events:none;background:#d90016;opacity:0}
body.display #p76-period-alarm.active{display:block;animation:p76Period .8s steps(1,end) infinite}
@keyframes p76Period{0%,100%{opacity:.08}50%{opacity:.58}}
.board.p76-period-warning{animation:p76Board .8s steps(1,end) infinite}
@keyframes p76Board{0%,100%{outline:0 solid red}50%{outline:8px solid #ff1535}}
.p76-shot-buttons{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.p76-shot-buttons button{width:100%;min-height:78px;font-size:22px;font-weight:900;border:2px solid white}
#p76-shot24{background:#d7152d;color:white}#p76-shot14{background:#3bdb39;color:#041904}
.p76-team-row{display:flex;gap:8px;align-items:center}.p76-team-row input{min-width:0;flex:1}
.p76-team-row button{background:#ff6500;color:black;padding:10px 13px;font-size:21px}
.p76-config-preview{width:55px;height:55px;object-fit:contain;border:2px solid #ff6500;border-radius:50%}
.p76-team-footer{display:flex;align-items:center;gap:8px;min-height:65px;margin-top:8px}
.p76-remove{background:#762b21;border:0;padding:3px 9px;font-size:24px}
.p76-team-card{border:1px solid #343a42;padding:12px;border-radius:10px}.p76-team-card select{margin:0 0 10px}
#p76-library-status{color:#ffbb7c;font-size:13px;line-height:1.5}
.p76-auth-fields{display:grid;gap:10px;margin-top:12px}
`;
  document.head.append(style);
  const alarm=document.createElement('div');alarm.id='p76-period-alarm';alarm.setAttribute('aria-hidden','true');document.body.append(alarm);
  const baseChange=change;
  change=function(mutator){
    const observed=state&&state.running?(state.mainAlarmAt||state.stamp+state.seconds*1000):null;
    return baseChange(()=>{
      const beforeRunning=state.running,beforeSeconds=state.seconds,beforeDeadline=state.mainAlarmAt||observed;
      mutator();
      state.mainAlarmAt=state.running?(!beforeRunning||state.seconds!==beforeSeconds?Date.now()+state.seconds*1000:beforeDeadline||Date.now()+state.seconds*1000):null;
    });
  };
  const previousRemaining=remaining;
  remaining=function(){
    if(state&&state.running&&Number.isFinite(state.mainAlarmAt))return Math.max(0,Math.ceil((state.mainAlarmAt-Date.now())/1000));
    return previousRemaining();
  };
  function shotSet(seconds,alternate){
    const current=state.shot.team;
    state.shot={team:alternate?(current===0?1:0):(current===null?0:current),seconds,running:true,stamp:Date.now()};
  }
  function inAlertWindow(running,end,now){return running&&now>=end&&now<end+5000;}
  function updateMainAlarm(){
    if(!state)return;
    const end=state.mainAlarmAt||state.stamp+state.seconds*1000;
    const expired=inAlertWindow(state.running,end,Date.now());
    alarm.classList.toggle('active',expired);
    $('board').classList.toggle('p76-period-warning',expired&&!view);
  }
  renderShot=function(){
    if(!state)return;
    const shot=state.shot,now=Date.now(),value=Math.ceil(shotRemaining());
    const expired=inAlertWindow(shot.running,shot.stamp+shot.seconds*1000,now);
    for(let i=0;i<2;i++){
      const selected=shot.team===i,box=$('shot'+i);
      box.textContent=selected?value:24;
      box.classList.toggle('active',selected);box.classList.toggle('inactive',!selected);box.classList.remove('expired');
      box.classList.toggle('p76-shot-alarm',selected&&expired);
      box.setAttribute('aria-disabled',String(!selected));
      box.setAttribute('aria-label',state.names[i]+': '+(selected?value:24)+' segundos');
    }
    updateMainAlarm();
  };

  const drafts=[{name:'LOCAL',logo:''},{name:'VISITA',logo:''}];
  let catalog={},firebase=null,user=null;
  const libraryPath='teamIntroOverlay/logoLibrary';
  function libraryMessage(text){const node=$('p76-library-status');if(node)node.textContent=text;}
  function previewDraft(i){
    const image=$('p76-logo-preview'+i);if(!image)return;
    image.hidden=!drafts[i].logo;
    if(drafts[i].logo)image.src=drafts[i].logo;else image.removeAttribute('src');
    $('p76-logo-remove'+i).hidden=!drafts[i].logo;
  }
  function updateCatalog(){
    for(let i=0;i<2;i++){
      const select=$('p76-catalog'+i);if(!select)continue;
      const selected=select.value;select.replaceChildren();
      const placeholder=document.createElement('option');placeholder.value='';placeholder.textContent='Seleccionar equipo guardado…';select.append(placeholder);
      Object.entries(catalog).filter(([,item])=>item&&typeof item.name==='string').sort((a,b)=>a[1].name.localeCompare(b[1].name,'es')).forEach(([itemId,item])=>{
        const option=document.createElement('option');option.value=itemId;option.textContent=item.name;select.append(option);
      });
      if(catalog[selected])select.value=selected;
    }
  }
  async function connectCatalog(){
    try{
      const [appModule,dbModule,authModule]=await Promise.all([
        import('https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js'),
        import('https://www.gstatic.com/firebasejs/12.19.0/firebase-database.js'),
        import('https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js')
      ]);
      const config={apiKey:'AIzaSyBC17Z1q3U6lweV3NLq9zFpoDcyv27Ecg4',authDomain:'puntodeportivo-76.firebaseapp.com',databaseURL:'https://puntodeportivo-76-default-rtdb.firebaseio.com',projectId:'puntodeportivo-76',storageBucket:'puntodeportivo-76.firebasestorage.app',messagingSenderId:'881911537312',appId:'1:881911537312:web:9a5fb8f21ca43887c2f3c5'};
      const app=appModule.getApps().find(item=>item.name==='p76-team-control-v2')||appModule.initializeApp(config,'p76-team-control-v2');
      firebase={db:dbModule.getDatabase(app),auth:authModule.getAuth(app),ref:dbModule.ref,set:dbModule.set,signIn:authModule.signInWithEmailAndPassword};
      let unsubscribe=null;
      authModule.onAuthStateChanged(firebase.auth,current=>{
        user=current;
        const authBox=$('p76-library-login');if(authBox)authBox.hidden=!!user;
        if(unsubscribe)unsubscribe();
        unsubscribe=dbModule.onValue(firebase.ref(firebase.db,libraryPath),snapshot=>{
          catalog=snapshot.val()||{};updateCatalog();
          libraryMessage(user?'Catálogo conectado. Los equipos guardados estarán disponibles desde otros dispositivos con acceso.':'Catálogo disponible. Inicia sesión de administrador para guardar equipos.');
        },()=>libraryMessage(user?'Firebase no permite acceder al catálogo. Revisa las reglas para teamIntroOverlay/logoLibrary.':'Inicia sesión con tu cuenta administradora de Firebase para acceder al catálogo.'));
      });
    }catch{libraryMessage('No se pudo conectar el catálogo. Revisa Internet y vuelve a abrir el control.');}
  }
  async function saveCatalog(){
    if(!firebase||!user){libraryMessage('Para guardar equipos en la base, inicia sesión con tu cuenta administradora de Firebase.');return;}
    try{
      let saved=0;
      for(const item of drafts){
        if(!item.name.trim()||!item.logo)continue;
        const existing=Object.entries(catalog).find(([,entry])=>entry.name?.trim().toLocaleLowerCase('es')===item.name.trim().toLocaleLowerCase('es'));
        const itemId=existing?existing[0]:crypto.randomUUID();
        await firebase.set(firebase.ref(firebase.db,libraryPath+'/'+itemId),{name:item.name.trim(),logo:item.logo,updatedAt:Date.now()});saved++;
      }
      libraryMessage(saved?'Equipos guardados en la base. Ya puedes seleccionarlos sin volver a cargar las imágenes.':'Ingresa el nombre y el escudo de al menos un equipo antes de guardar.');
    }catch{libraryMessage('No se pudo guardar el catálogo. Revisa conexión y permisos de Firebase; el marcador conserva sus equipos.');}
  }
  function installUI(){
    if(!key||!state||!$('controls').children.length||$('p76-shot24'))return;
    function sectionWith(title){return [...$('controls').querySelectorAll('section')].find(section=>section.querySelector('h3')?.textContent===title);}
    const shots=sectionWith('Cuenta regresiva de 24 segundos');
    const possession=sectionWith('Posesión del balón');
    const teams=sectionWith('Logotipos de los equipos');
    if(!shots||!possession||!teams){message('No se pudo aplicar la actualización. Comprueba que index.html y actualizacion-p76.js se subieron juntos.');return;}
    shots.innerHTML='<h3>Cuenta regresiva</h3><div class="p76-shot-buttons"><button id="p76-shot24">Cambiar a 24</button><button id="p76-shot14">Cambiar a 14</button></div>';
    $('p76-shot24').onclick=()=>change(()=>shotSet(24,true));
    $('p76-shot14').onclick=()=>change(()=>shotSet(14,false));
    possession.innerHTML='<h3>Posesión del balón</h3><button id="p76-possession" class="orange">Cambiar posesión</button>';
    $('p76-possession').onclick=()=>change(()=>state.possession=state.possession===0?1:0);
    teams.innerHTML=`<h3>Equipos</h3><div class="logo-grid" id="p76-team-config"></div>
      <button class="orange" id="p76-save-teams" style="width:100%;margin-top:15px">Guardar equipos</button>
      <details style="margin-top:18px"><summary>Catálogo de equipos en la base</summary>
        <p class="muted small">Sube cada escudo una vez y guárdalo aquí. Después podrás seleccionar el equipo desde cualquier dispositivo con acceso.</p>
        <div id="p76-library-login"><p class="muted small">Usa la misma cuenta administradora de Firebase de tu control de equipos.</p>
          <div class="p76-auth-fields"><input id="p76-email" type="email" autocomplete="username" placeholder="Correo administrador" aria-label="Correo administrador">
          <input id="p76-password" type="password" autocomplete="current-password" placeholder="Contraseña" aria-label="Contraseña">
          <button id="p76-login">Conectar catálogo</button></div>
        </div>
        <button id="p76-save-catalog" style="margin-top:12px">Guardar estos equipos en el catálogo</button>
        <p id="p76-library-status" role="status">Conectando catálogo…</p>
      </details>`;
    for(let i=0;i<2;i++){
      drafts[i]={name:state.names[i],logo:state.logos[i]};
      const card=document.createElement('div');card.className='p76-team-card';
      card.innerHTML=`<h4>${i?'EQUIPO VISITANTE':'EQUIPO LOCAL'}</h4>
        <select id="p76-catalog${i}" aria-label="Equipo guardado ${i?'visitante':'local'}"></select>
        <div class="p76-team-row"><input id="p76-team-name${i}" maxlength="32" placeholder="Nombre del equipo" aria-label="Nombre del equipo ${i?'visitante':'local'}">
          <button id="p76-team-upload${i}" title="Subir escudo" aria-label="Subir escudo">🛡</button></div>
        <div class="p76-team-footer"><img id="p76-logo-preview${i}" class="p76-config-preview" alt="Escudo del equipo" hidden>
          <button class="p76-remove" id="p76-logo-remove${i}" aria-label="Quitar escudo" hidden>×</button></div>
        <input id="p76-team-file${i}" type="file" accept="image/png,image/jpeg,image/webp" hidden>`;
      $('p76-team-config').append(card);
      $('p76-team-name'+i).value=drafts[i].name;
      $('p76-team-name'+i).oninput=event=>drafts[i].name=event.target.value;
      $('p76-team-upload'+i).onclick=()=>$('p76-team-file'+i).click();
      $('p76-team-file'+i).onchange=async event=>{
        const file=event.target.files[0];if(!file)return;
        try{drafts[i].logo=await shrinkLogo(file);previewDraft(i);libraryMessage('Escudo cargado. Pulsa Guardar equipos para aplicarlo y Guardar estos equipos en el catálogo para conservarlo en la base.');}
        catch(error){libraryMessage(error.message);}finally{event.target.value='';}
      };
      $('p76-logo-remove'+i).onclick=()=>{drafts[i].logo='';previewDraft(i);};
      $('p76-catalog'+i).onchange=event=>{
        const item=catalog[event.target.value];if(!item)return;
        drafts[i]={name:item.name.slice(0,32),logo:safeLogo(item.logo)};
        $('p76-team-name'+i).value=drafts[i].name;previewDraft(i);
      };
      previewDraft(i);
      const oldName=$('name'+i);if(oldName){const label=oldName.previousElementSibling;if(label?.tagName==='LABEL')label.remove();oldName.remove();}
    }
    $('p76-save-teams').onclick=()=>{
      const names=drafts.map((item,i)=>item.name.trim()||(i?'VISITA':'LOCAL')),logos=drafts.map(item=>item.logo);
      change(()=>{state.names=names;state.logos=logos;});
    };
    $('p76-save-catalog').onclick=saveCatalog;
    $('p76-login').onclick=async()=>{
      if(!firebase){libraryMessage('El catálogo todavía no está conectado. Vuelve a abrir el control.');return;}
      try{await firebase.signIn(firebase.auth,$('p76-email').value.trim(),$('p76-password').value);$('p76-password').value='';}
      catch{$('p76-password').value='';libraryMessage('No se pudo iniciar sesión. Revisa el correo, la contraseña y los permisos de acceso.');}
    };
    updateCatalog();connectCatalog();
  }
  const baseBuild=buildControls;
  buildControls=function(){baseBuild();installUI();};
  installUI();render();
})();
