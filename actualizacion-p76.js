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
.p76-shot-buttons{display:grid;grid-template-columns:1fr;gap:12px}
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

.score{box-sizing:border-box;overflow:hidden;display:flex;align-items:center;justify-content:center;height:205px;width:350px;max-width:100%;margin:0 auto;padding:0 12px;border:2px solid #393939;border-radius:16px;letter-spacing:-4px;line-height:1.12;background:#000}
.p76-score-divider{position:absolute;left:796px;top:390px;width:8px;height:220px;background:#ff6500;border-radius:4px;z-index:3}
#p76-global-pause{width:100%;min-height:78px;font-size:24px;font-weight:900;background:#d7152d;color:white;border:2px solid white}
#p76-global-pause.paused{background:#3bdb39;color:#041904}
#p76-global-note{font-size:13px;color:#b9c7d6;margin:12px 0 0}
.p76-stat-controls{display:grid;grid-template-columns:1fr 1fr;gap:18px}
.p76-stat-controls>div{border:1px solid #343a42;border-radius:10px;padding:12px}
.points{display:flex!important;flex-direction:column!important;gap:12px!important}.points button{width:100%;min-height:64px;font-size:28px}
body:not(.display) #links{display:flex!important;flex-direction:row!important;flex-wrap:nowrap;overflow-x:auto;gap:10px}#links>*{flex-shrink:0}
.p76-stat-controls [data-field]{min-width:76px;min-height:70px;font-size:40px;font-weight:900;padding:6px 15px}
.p76-stat-value{font-size:26px;font-weight:900;margin-left:10px}
.p76-stat-controls h4{margin:0 0 14px;color:#ffb369}
@media(max-width:650px){.p76-stat-controls{grid-template-columns:1fr}}
`;
  style.textContent+='\n/* Control de teléfono: estructura de dos columnas para puntos y tarjetas completas. */\n@media(max-width:650px){\n body:not(.display) main{padding:12px;max-width:100%;overflow-x:hidden}\n body:not(.display) header{padding:12px;gap:8px}\n body:not(.display) .brand{font-size:14px}\n body:not(.display) h1{font-size:26px;margin:12px 0}\n body:not(.display) #intro .muted{font-size:14px;margin:8px 0}\n body:not(.display) #links{display:grid!important;grid-template-columns:minmax(0,1fr) minmax(0,1fr);overflow:visible;gap:8px;align-items:stretch}\n body:not(.display) #links button,body:not(.display) #links .button{width:100%;min-width:0;min-height:48px;padding:10px 7px;font-size:13px;text-align:center;display:flex;align-items:center;justify-content:center;white-space:normal}\n body:not(.display) #links .small{grid-column:1/-1;font-size:12px}\n body:not(.display) #controls{grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:12px;margin-top:14px}\n body:not(.display) #controls>.wide{grid-column:1/-1}\n body:not(.display) #controls .panel{padding:14px;border-radius:12px}\n body:not(.display) #controls h3{font-size:18px;line-height:1.25;margin:0 0 12px}\n body:not(.display) #controls button{touch-action:manipulation}\n body:not(.display) .p76-shot-buttons{gap:10px}\n body:not(.display) .p76-shot-buttons button,body:not(.display) #p76-global-pause{font-size:20px;min-height:60px;padding:12px}\n body:not(.display) #p76-possession{width:100%;min-height:54px;font-size:18px}\n body:not(.display) #p76-global-note{font-size:12px;line-height:1.5;margin-top:10px}\n body:not(.display) .p76-stat-controls{grid-template-columns:minmax(0,1fr);gap:12px}\n body:not(.display) .p76-stat-controls>div{padding:12px;min-width:0}\n body:not(.display) .p76-stat-controls h4{margin:0 0 8px;font-size:15px;overflow-wrap:anywhere}\n body:not(.display) .p76-stat-controls .line{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:10px;margin:0;padding:10px 0;border-top:1px solid #282828;align-items:center}\n body:not(.display) .p76-stat-controls .line>span:first-child{display:flex;flex-direction:column;align-items:flex-start;gap:4px;font-size:14px;line-height:1.3}\n body:not(.display) .p76-stat-value{font-size:24px;margin:0;white-space:nowrap;line-height:1.2}\n body:not(.display) .p76-stat-controls .line>span:last-child{display:flex;flex-direction:row;gap:8px;align-items:center}\n body:not(.display) .p76-stat-controls [data-field]{min-width:52px;width:52px;min-height:54px;height:54px;padding:0;font-size:34px;line-height:1;display:flex;align-items:center;justify-content:center}\n body:not(.display) #team-control0,body:not(.display) #team-control1{grid-column:auto;padding:12px}\n body:not(.display) #team-control0 h3,body:not(.display) #team-control1 h3{font-size:16px;text-align:center}\n body:not(.display) .points{margin:10px 0 0;gap:9px!important}\n body:not(.display) .points button{min-height:56px;padding:10px 4px;font-size:26px}\n body:not(.display) #p76-timing .bar{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:12px 0}\n body:not(.display) #p76-timing .bar button{min-width:0;padding:12px 6px;min-height:52px;font-size:14px}\n body:not(.display) #p76-timing .bar:has(#reset){grid-template-columns:1fr}\n body:not(.display) #p76-timing .time-inputs{display:grid;grid-template-columns:minmax(0,1fr) auto minmax(0,1fr);gap:8px}\n body:not(.display) #p76-timing .time-inputs input{width:100%;min-width:0;font-size:20px;text-align:center}\n body:not(.display) #settime{grid-column:1/-1;min-height:48px}\n body:not(.display) #p76-timing select{min-height:48px}\n body:not(.display) #p76-team-config{grid-template-columns:minmax(0,1fr);gap:12px}\n body:not(.display) .p76-team-card{padding:12px;min-width:0}\n body:not(.display) .p76-team-card h4{font-size:14px;margin:0 0 12px}\n body:not(.display) .p76-team-row input,body:not(.display) .p76-team-card select{font-size:16px;min-height:46px}\n body:not(.display) #controls details summary{font-size:14px;line-height:1.4;padding:8px 0}\n body:not(.display) #controls .muted.small{font-size:12px;line-height:1.5}\n}\n';
  style.textContent+='\n.p76-match-actions{display:grid;grid-template-columns:1fr 1fr;gap:12px;align-items:stretch}\n.p76-match-actions button{min-height:70px;font-size:22px;font-weight:900;width:100%}\n#p76-finish{width:100%;margin-top:12px;min-height:54px;background:#721b24;border-color:#da4252;font-weight:800;font-size:18px}\n.p76-points-grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:12px}\n#p76-final{position:absolute;inset:0;background:#000;z-index:10;display:flex;flex-direction:column;align-items:center;padding:20px 35px;color:white}\n.p76-final-brand{width:100px;height:100px;object-fit:contain}\n.p76-final-title{font-size:68px;font-weight:900;font-style:italic;margin:10px 0 20px;letter-spacing:2px}\n.p76-final-frame{width:100%;min-height:555px;border:5px solid #ff6500;border-radius:30px;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,2fr) minmax(0,1fr);align-items:center;padding:20px;gap:20px}\n.p76-final-team{text-align:center;min-width:0}.p76-final-team img{width:350px;max-width:100%;height:350px;object-fit:contain}\n.p76-final-name{font-size:42px;font-weight:900;overflow-wrap:anywhere;border:2px solid #ff6500;padding:14px 10px;margin-top:15px;min-height:78px}\n.p76-final-scores{display:flex;align-items:center;justify-content:center;gap:20px;font-size:150px;font-weight:900;font-variant-numeric:tabular-nums;letter-spacing:-5px}\n.p76-final-scores span{min-width:0}.p76-final-dash{font-size:80px;color:#ff6500}\n.p76-final-footer{font-size:26px;letter-spacing:3px;margin-top:20px}.p76-final-footer b{color:#ff6500}\n@media(max-width:650px){body:not(.display) .p76-match-actions{gap:10px}body:not(.display) .p76-match-actions button,body:not(.display) .p76-match-actions #p76-global-pause{font-size:17px;min-height:60px}body:not(.display) #p76-points .panel{padding:10px}body:not(.display) #p76-timing .bar:has(#next){grid-template-columns:1fr}}\n';
  style.textContent+='\n.p76-landscape-tools{display:none}#p76-preview-toggle{display:none}\n@media(orientation:landscape) and (min-width:651px) and (max-width:1100px) and (max-height:600px){\n body:not(.display) main{padding:10px;max-width:none}\n body:not(.display) header{padding:8px 12px}\n body:not(.display) #intro{display:none}\n body:not(.display) #links{display:none!important;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;overflow:visible;margin:8px 0}\n body:not(.display).p76-show-links #links{display:grid!important}\n body:not(.display) .p76-landscape-tools{display:grid;grid-template-columns:1fr 1fr;gap:8px}\n body:not(.display) #p76-links-toggle{min-height:44px;margin:8px 0;font-size:15px}\n body:not(.display) #recovery-note{display:none}\n body:not(.display) #message{min-height:0;margin:4px 0;font-size:12px}\n body:not(.display) #links button,body:not(.display) #links .button{white-space:normal;text-align:center;font-size:13px;padding:10px 6px;min-height:48px;width:100%;min-width:0}\n body:not(.display) #links .small{grid-column:1/-1}\n body:not(.display) #board{display:none}\n body:not(.display).p76-show-preview #board{display:block}\n body:not(.display) #p76-preview-toggle{display:block;width:100%;min-height:44px;margin:8px 0;font-size:15px}\n body:not(.display) #controls{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));gap:10px;margin-top:12px;align-items:start}\n body:not(.display) #controls>.panel{padding:12px;min-width:0;margin:0}\n body:not(.display) #controls h3{font-size:18px;margin:0 0 12px}\n body:not(.display) #p76-shots,body:not(.display) #p76-possession-panel,body:not(.display) #p76-match-panel{grid-column:span 4}\n body:not(.display) #p76-stats-panel,body:not(.display) #p76-points,body:not(.display) #p76-timing,body:not(.display) #p76-teams-panel{grid-column:span 6}\n body:not(.display) .p76-shot-buttons button{font-size:20px;min-height:62px;padding:12px}\n body:not(.display) #p76-possession{width:100%;min-height:62px;font-size:18px}\n body:not(.display) .p76-match-actions{gap:8px}\n body:not(.display) .p76-match-actions button,body:not(.display) #p76-global-pause{font-size:17px;min-height:62px;padding:12px 6px}\n body:not(.display) #p76-finish{font-size:17px;min-height:52px}\n body:not(.display) #p76-global-note{font-size:12px;line-height:1.4}\n body:not(.display) .p76-stat-controls{grid-template-columns:1fr;gap:10px}\n body:not(.display) .p76-stat-controls>div{padding:10px}\n body:not(.display) .p76-stat-controls .line{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:8px;padding:8px 0;margin:0;border-top:1px solid #292929}\n body:not(.display) .p76-stat-controls .line>span:first-child{display:flex;flex-direction:column;gap:4px;font-size:14px}\n body:not(.display) .p76-stat-value{font-size:24px;margin:0;white-space:nowrap}\n body:not(.display) .p76-stat-controls .line>span:last-child{display:flex;gap:8px}\n body:not(.display) .p76-stat-controls [data-field]{width:58px;min-width:58px;min-height:58px;font-size:36px;line-height:1;padding:8px}\n body:not(.display) #p76-points .panel{padding:10px}\n body:not(.display) #p76-points h3{font-size:17px}\n body:not(.display) .points{gap:10px!important;margin:12px 0 0}\n body:not(.display) .points button{font-size:28px;min-height:64px;padding:12px 4px}\n body:not(.display) #p76-timing .bar{display:grid;grid-template-columns:1fr;margin:10px 0}\n body:not(.display) #p76-timing button{min-height:50px;font-size:16px}\n body:not(.display) .time-inputs{display:grid;grid-template-columns:minmax(0,1fr) auto minmax(0,1fr);gap:8px}\n body:not(.display) .time-inputs input{width:100%;font-size:20px;text-align:center}\n body:not(.display) #settime{grid-column:1/-1}\n body:not(.display) #p76-team-config{grid-template-columns:1fr;gap:12px}\n body:not(.display) .p76-team-card select,body:not(.display) .p76-team-card input{min-height:48px;font-size:16px}\n body:not(.display) #controls button{touch-action:manipulation}\n}\n';
  document.head.append(style);
  const divider=document.createElement('div');divider.className='p76-score-divider';divider.setAttribute('aria-hidden','true');$('stage').append(divider);
  const final=document.createElement('div');final.id='p76-final';final.hidden=true;
  final.innerHTML='<img class="p76-final-brand" alt="Punto Deportivo 76"><div class="p76-final-title">FINAL DEL PARTIDO</div><div class="p76-final-frame"><div class="p76-final-team"><img id="p76-final-logo0" alt="Escudo local"><div class="p76-final-name" id="p76-final-name0"></div></div><div class="p76-final-scores"><span id="p76-final-score0"></span><span class="p76-final-dash">–</span><span id="p76-final-score1"></span></div><div class="p76-final-team"><img id="p76-final-logo1" alt="Escudo visitante"><div class="p76-final-name" id="p76-final-name1"></div></div></div><div class="p76-final-footer">PUNTO DEPORTIVO 76 · <b>STREAMING</b></div>';
  final.querySelector('.p76-final-brand').src=document.querySelector('.emblem img').getAttribute('src');$('stage').append(final);
  const alarm=document.createElement('div');alarm.id='p76-period-alarm';alarm.setAttribute('aria-hidden','true');document.body.append(alarm);
  const baseChange=change;
  change=function(mutator){
    const observed=state&&state.running?(state.mainAlarmAt||state.stamp+state.seconds*1000):null;
    return baseChange(()=>{
      const beforeRunning=state.running,beforeSeconds=state.seconds,beforeDeadline=state.mainAlarmAt||observed;
      const oldPeriod=state.period;
      mutator();
      if(!state.running&&!state.finished&&!state.globalPause?.active&&state.seconds!==beforeSeconds)state.periodStarted=false;
      if(state.period!==oldPeriod){
        state.fouls=[0,0];state.timeouts=[0,0];state.statLocks=null;state.globalPause=null;state.periodStarted=false;
        state.running=false;state.shot={...state.shot,seconds:24,running:false,stamp:clockNow()};
      }
      for(const [field,max] of [['fouls',5],['timeouts',2]]){
        state[field]=state[field].map(v=>Math.max(0,Math.min(max,v)));
      }
      state.mainAlarmAt=state.running?(!beforeRunning||state.seconds!==beforeSeconds?clockNow()+state.seconds*1000:beforeDeadline||clockNow()+state.seconds*1000):null;
    });
  };
  const previousRemaining=remaining;
  remaining=function(){
    if(state&&state.running&&Number.isFinite(state.mainAlarmAt))return Math.max(0,Math.ceil((state.mainAlarmAt-clockNow())/1000));
    return Math.ceil(previousRemaining());
  };
  function shotSet(seconds,alternate){
    if(state.globalPause?.active||state.finished||!startedPeriod()||remaining()<=0)return;
    const current=state.shot.team;
    state.shot={team:alternate?(current===0?1:0):(current===null?0:current),seconds,running:true,stamp:clockNow()};
  }

  function toggleGlobalPause(){
    const now=clockNow();
    if(state.globalPause?.active){
      const pause=state.globalPause;
      state.running=!!pause.mainWasRunning&&state.seconds>0;
      state.stamp=now;
      state.mainAlarmAt=state.running?now+state.seconds*1000:null;
      state.shot={...state.shot,running:!!pause.shotWasRunning&&state.shot.team!==null&&state.shot.seconds>0,stamp:now};
      state.globalPause=null;
    }else{
      const mainWasRunning=state.running;
      const shotWasRunning=state.shot.running&&state.shot.team!==null&&shotRemaining()>0;
      const deadline=state.mainAlarmAt||state.stamp+state.seconds*1000;
      state.seconds=mainWasRunning?Math.max(0,(deadline-now)/1000):state.seconds;
      state.stamp=now;
      state.running=false;
      state.mainAlarmAt=null;
      state.shot={...state.shot,seconds:shotRemaining(),running:false,stamp:now};
      state.globalPause={active:true,mainWasRunning,shotWasRunning};
    }
  }
  function adjustStat(i,field,delta,max){
    if(state.finished||state.statLocks?.[field]?.[i]||state[field][i]>=max||(delta<0&&state[field][i]<=0))return;
    if(!state.globalPause?.active)toggleGlobalPause();
    state[field][i]=Math.max(0,Math.min(max,state[field][i]+delta));
    state.statLocks=state.statLocks||{fouls:[false,false],timeouts:[false,false]};
    if(state[field][i]>=max)state.statLocks[field][i]=true;
  }
  function startedPeriod(){return !!(state.periodStarted??(state.running||state.globalPause?.mainWasRunning));}
  function startPeriod(){
    if(state.finished||(startedPeriod()&&remaining()>0))return;
    if(state.seconds<=0)state.seconds=state.period>4?300:600;
    state.periodStarted=true;state.globalPause=null;state.running=true;state.stamp=clockNow();state.mainAlarmAt=clockNow()+state.seconds*1000;
  }
  function finishMatch(){
    if(state.finished)return;
    if(!state.globalPause?.active)toggleGlobalPause();
    state.running=false;state.shot.running=false;state.finished=true;
    state.finalResult={names:[...state.names],logos:[...state.logos],scores:[...state.scores]};
  }
  function renderFinal(){
    const layer=$('p76-final');if(!layer||!state)return;
    const finished=!!state.finished;layer.hidden=!finished;
    if(!finished)return;
    const result=state.finalResult||state;
    const digits=Math.max(...result.scores.map(n=>String(n).length));layer.querySelector('.p76-final-scores').style.fontSize=digits>=4?'130px':digits===3?'180px':'240px';
    for(let i=0;i<2;i++){
      $('p76-final-name'+i).textContent=result.names[i];
      $('p76-final-score'+i).textContent=result.scores[i];
      const img=$('p76-final-logo'+i),src=safeLogo(result.logos?.[i]);img.hidden=!src;if(src&&img.getAttribute('src')!==src)img.src=src;
    }
  }
  function syncGlobalUI(){
    if(!state)return;
    const paused=!!state.globalPause?.active;
    const started=startedPeriod(),ended=!!state.finished,atZero=remaining()<=0;
    for(const id of ['p76-shot24','p76-shot14'])if($(id))$(id).disabled=paused||ended||!started||atZero;
    if($('p76-start'))$('p76-start').disabled=ended||(started&&!atZero);
    if($('p76-finish'))$('p76-finish').disabled=ended;
    if($('p76-possession'))$('p76-possession').disabled=ended;
    if($('next'))$('next').disabled=ended;
    if($('setperiod'))$('setperiod').disabled=ended;
    if($('settime'))$('settime').disabled=ended||started&&!atZero;
    for(const team of ['team-control0','team-control1'])$(team)?.querySelectorAll('button').forEach(b=>b.disabled=ended);
    if($('p76-global-pause'))$('p76-global-pause').disabled=ended||!started||atZero;
    const button=$('p76-global-pause');
    if(button){
      button.textContent=paused?'Continuar':'Detener';
      button.classList.toggle('paused',paused);
      button.setAttribute('aria-pressed',String(paused));
      $('p76-global-note').textContent=ended?'Partido terminado. Reinicia el partido para comenzar otro.':!started?'Pulsa Iniciar reloj para habilitar Detener / Continuar.':paused?'Pausa activa. Se conservan los tiempos y se bloquean Cambiar a 24 y Cambiar a 14.':'Detiene ambos relojes. Al continuar se reanudan los que estaban contando.';
    }
    renderFinal();
    for(let i=0;i<2;i++){
      const score=$('s'+i);if(score){const digits=String(state.scores[i]).length;score.style.fontSize=digits>=4?'105px':digits===3?'145px':'180px';}
      const label=$('p76-stat-team'+i);if(label)label.textContent=state.names[i];
      for(const [field,max] of [['fouls',5],['timeouts',2]]){
        const locked=ended||!!state.statLocks?.[field]?.[i]||state[field][i]>=max;
        const area=$('p76-stat-control'+i);
        if(area)area.querySelectorAll('[data-field="'+field+'"]').forEach(b=>b.disabled=locked||(Number(b.dataset.value)<0&&state[field][i]<=0));
        const count=$('p76-count-'+field+i);if(count)count.textContent=Math.min(max,state[field][i])+' / '+max;
      }
    }
  }

  function inAlertWindow(running,end,now){return running&&now>=end&&now<end+5000;}
  function updateMainAlarm(){
    if(!state)return;
    const end=state.mainAlarmAt||state.stamp+state.seconds*1000;
    const expired=inAlertWindow(state.running,end,clockNow());
    alarm.classList.toggle('active',expired);
    $('board').classList.toggle('p76-period-warning',expired&&!view);
  }
  renderShot=function(){
    if(!state)return;
    const shot=state.shot,now=clockNow(),value=Math.ceil(shotRemaining());
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
    syncGlobalUI();
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
        await firebase.set(firebase.ref(firebase.db,libraryPath+'/'+itemId),{name:item.name.trim(),logo:item.logo,updatedAt:clockNow()});saved++;
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
    shots.id='p76-shots';possession.id='p76-possession-panel';teams.id='p76-teams-panel';
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

    const pauseSection=document.createElement('section');pauseSection.className='panel wide';pauseSection.id='p76-match-panel';
    pauseSection.innerHTML='<h3>Iniciar reloj</h3><div class="p76-match-actions"><button id="p76-start" class="orange">Iniciar reloj</button><button id="p76-global-pause" aria-pressed="false">Detener</button></div><button id="p76-finish">Terminar partido</button><p id="p76-global-note"></p>';
    const statsSection=document.createElement('section');statsSection.className='panel wide';statsSection.id='p76-stats-panel';
    statsSection.innerHTML='<h3>Faltas y tiempos</h3><div class="p76-stat-controls"><div id="p76-stat-control0"><h4 id="p76-stat-team0">LOCAL</h4></div><div id="p76-stat-control1"><h4 id="p76-stat-team1">VISITA</h4></div></div>';
    /* Mover los controles conservando todos sus eventos. */
    $('controls').append(pauseSection,statsSection);
    for(let i=0;i<2;i++)$('team-control'+i).querySelectorAll('.line').forEach(line=>$('p76-stat-control'+i).append(line));
    for(let i=0;i<2;i++){
      const area=$('p76-stat-control'+i);
      for(const [field,max] of [['fouls',5],['timeouts',2]]){
        const plus=area.querySelector('[data-field="'+field+'"][data-value="1"]');
        const count=document.createElement('span');count.id='p76-count-'+field+i;count.className='p76-stat-value';plus.closest('.line').querySelector('span').append(count);
        area.querySelectorAll('[data-field="'+field+'"]').forEach(button=>button.onclick=()=>{
          const delta=Number(button.dataset.value);
          if(state.statLocks?.[field]?.[i]||state[field][i]>=max||(delta<0&&state[field][i]<=0))return;
          change(()=>adjustStat(i,field,delta,max));
        });
      }
    }
    $('resetfouls').remove();
    $('p76-start').onclick=()=>change(startPeriod);
    $('p76-global-pause').onclick=()=>{if(startedPeriod()&&!state.finished&&remaining()>0)change(toggleGlobalPause);};
    $('p76-finish').onclick=()=>{if(confirm('¿Terminar el partido y mostrar el marcador final?'))change(finishMatch);};
    const timing=sectionWith('Reloj y período');timing.id='p76-timing';$('toggle').remove();
    const points=document.createElement('section');points.className='panel wide';points.id='p76-points';points.innerHTML='<h3>Puntaje</h3><div class="p76-points-grid" id="p76-points-grid"></div>';
    $('controls').append(points);$('p76-points-grid').append($('team-control0'),$('team-control1'));
    const ordered=[shots,possession,pauseSection,statsSection,points,timing,teams];
    ordered.filter(Boolean).forEach(section=>$('controls').append(section));
    const previewButton=document.createElement('button');previewButton.id='p76-preview-toggle';previewButton.textContent='Mostrar tablero';previewButton.setAttribute('aria-expanded','false');
    const landscapeTools=document.createElement('div');landscapeTools.className='p76-landscape-tools';
    const linksButton=document.createElement('button');linksButton.id='p76-links-toggle';linksButton.textContent='Enlaces del partido';linksButton.setAttribute('aria-expanded','false');
    linksButton.onclick=()=>{const open=document.body.classList.toggle('p76-show-links');linksButton.setAttribute('aria-expanded',String(open));};
    landscapeTools.append(linksButton,previewButton);$('board').before(landscapeTools);previewButton.onclick=()=>{const visible=document.body.classList.toggle('p76-show-preview');previewButton.textContent=visible?'Ocultar tablero':'Mostrar tablero';previewButton.setAttribute('aria-expanded',String(visible));fitBoard();};
    syncGlobalUI();

    updateCatalog();connectCatalog();
  }
  const baseRender=render;
  render=function(){baseRender();syncGlobalUI();};
  const baseBuild=buildControls;
  buildControls=function(){baseBuild();installUI();};
  installUI();render();
})();

