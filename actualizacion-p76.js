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
  style.textContent+='\n.p76-match-actions{display:grid;grid-template-columns:1fr 1fr;gap:12px;align-items:stretch}\n.p76-match-actions button{min-height:70px;font-size:22px;font-weight:900;width:100%}\n#p76-finish{width:100%;margin-top:12px;min-height:54px;background:#721b24;border-color:#da4252;font-weight:800;font-size:18px}\n.p76-points-grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:12px}\n#p76-final{position:absolute;inset:0;background:#000;z-index:10;display:flex;flex-direction:column;align-items:center;padding:20px 35px;color:white}\n.p76-final-brand{width:140px;height:140px;object-fit:contain}\n.p76-final-title{font-size:68px;font-weight:900;font-style:italic;margin:10px 0 20px;letter-spacing:2px}\n.p76-final-frame{width:100%;min-height:555px;border:5px solid #ff6500;border-radius:30px;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,2fr) minmax(0,1fr);align-items:center;padding:20px;gap:20px}\n.p76-final-team{text-align:center;min-width:0}.p76-final-team img{width:350px;max-width:100%;height:350px;object-fit:contain}\n.p76-final-name{font-size:42px;font-weight:900;overflow-wrap:anywhere;border:2px solid #ff6500;padding:14px 10px;margin-top:15px;min-height:78px}\n.p76-final-scores{display:flex;align-items:center;justify-content:center;gap:20px;font-size:150px;font-weight:900;font-variant-numeric:tabular-nums;letter-spacing:-5px}\n.p76-final-scores span{min-width:0}.p76-final-dash{font-size:80px;color:#ff6500}\n.p76-final-footer{font-size:26px;letter-spacing:3px;margin-top:20px}.p76-final-footer b{color:#ff6500}\n@media(max-width:650px){body:not(.display) .p76-match-actions{gap:10px}body:not(.display) .p76-match-actions button,body:not(.display) .p76-match-actions #p76-global-pause{font-size:17px;min-height:60px}body:not(.display) #p76-points .panel{padding:10px}body:not(.display) #p76-timing .bar:has(#next){grid-template-columns:1fr}}\n';
  style.textContent+='\n.p76-landscape-tools{display:none}#p76-preview-toggle{display:none}\n@media(orientation:landscape) and (min-width:651px) and (max-width:1100px) and (max-height:600px){\n body:not(.display) main{padding:10px;max-width:none}\n body:not(.display) header{padding:8px 12px}\n body:not(.display) #intro{display:none}\n body:not(.display) #links{display:none!important;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;overflow:visible;margin:8px 0}\n body:not(.display).p76-show-links #links{display:grid!important}\n body:not(.display) .p76-landscape-tools{display:grid;grid-template-columns:1fr 1fr;gap:8px}\n body:not(.display) #p76-links-toggle{min-height:44px;margin:8px 0;font-size:15px}\n body:not(.display) #recovery-note{display:none}\n body:not(.display) #message{min-height:0;margin:4px 0;font-size:12px}\n body:not(.display) #links button,body:not(.display) #links .button{white-space:normal;text-align:center;font-size:13px;padding:10px 6px;min-height:48px;width:100%;min-width:0}\n body:not(.display) #links .small{grid-column:1/-1}\n body:not(.display) #board{display:none}\n body:not(.display).p76-show-preview #board{display:block}\n body:not(.display) #p76-preview-toggle{display:block;width:100%;min-height:44px;margin:8px 0;font-size:15px}\n body:not(.display) #controls{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));gap:10px;margin-top:12px;align-items:start}\n body:not(.display) #controls>.panel{padding:12px;min-width:0;margin:0}\n body:not(.display) #controls h3{font-size:18px;margin:0 0 12px}\n body:not(.display) #p76-shots,body:not(.display) #p76-possession-panel,body:not(.display) #p76-match-panel{grid-column:span 4}\n body:not(.display) #p76-stats-panel,body:not(.display) #p76-points,body:not(.display) #p76-timing,body:not(.display) #p76-teams-panel{grid-column:span 6}\n body:not(.display) .p76-shot-buttons button{font-size:20px;min-height:62px;padding:12px}\n body:not(.display) #p76-possession{width:100%;min-height:62px;font-size:18px}\n body:not(.display) .p76-match-actions{gap:8px}\n body:not(.display) .p76-match-actions button,body:not(.display) #p76-global-pause{font-size:17px;min-height:62px;padding:12px 6px}\n body:not(.display) #p76-finish{font-size:17px;min-height:52px}\n body:not(.display) #p76-global-note{font-size:12px;line-height:1.4}\n body:not(.display) .p76-stat-controls{grid-template-columns:1fr;gap:10px}\n body:not(.display) .p76-stat-controls>div{padding:10px}\n body:not(.display) .p76-stat-controls .line{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:8px;padding:8px 0;margin:0;border-top:1px solid #292929}\n body:not(.display) .p76-stat-controls .line>span:first-child{display:flex;flex-direction:column;gap:4px;font-size:14px}\n body:not(.display) .p76-stat-value{font-size:24px;margin:0;white-space:nowrap}\n body:not(.display) .p76-stat-controls .line>span:last-child{display:flex;gap:8px}\n body:not(.display) .p76-stat-controls [data-field]{width:58px;min-width:58px;min-height:58px;font-size:36px;line-height:1;padding:8px}\n body:not(.display) #p76-points .panel{padding:10px}\n body:not(.display) #p76-points h3{font-size:17px}\n body:not(.display) .points{gap:10px!important;margin:12px 0 0}\n body:not(.display) .points button{font-size:28px;min-height:64px;padding:12px 4px}\n body:not(.display) #p76-timing .bar{display:grid;grid-template-columns:1fr;margin:10px 0}\n body:not(.display) #p76-timing button{min-height:50px;font-size:16px}\n body:not(.display) .time-inputs{display:grid;grid-template-columns:minmax(0,1fr) auto minmax(0,1fr);gap:8px}\n body:not(.display) .time-inputs input{width:100%;font-size:20px;text-align:center}\n body:not(.display) #settime{grid-column:1/-1}\n body:not(.display) #p76-team-config{grid-template-columns:1fr;gap:12px}\n body:not(.display) .p76-team-card select,body:not(.display) .p76-team-card input{min-height:48px;font-size:16px}\n body:not(.display) #controls button{touch-action:manipulation}\n}\n';
  style.textContent+='\n#p76-landscape-nav{display:none}\n.p76-audio-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}.p76-audio-card{padding:12px;border:1px solid #343a42;border-radius:10px;min-width:0}.p76-audio-card h4{margin:0 0 12px}.p76-audio-card .bar{gap:8px}.p76-audio-card input{font-size:14px}.p76-audio-card p{overflow-wrap:anywhere}\nbody.display #viewtools:has(#p76-enable-sound:not(:disabled)){opacity:1}\n#p76-enable-sound{border-color:#ff6500}#p76-enable-sound:disabled{opacity:.8}\n@media(max-width:650px){.p76-audio-grid{grid-template-columns:1fr}}\n@media(orientation:landscape) and (min-width:651px) and (max-width:1100px) and (max-height:600px){\n body:not(.display){overflow:hidden}\n body:not(.display) header{height:28px;box-sizing:border-box;padding:4px 10px;font-size:12px}\n body:not(.display) main{padding:6px 10px;height:calc(100dvh - 28px);overflow:hidden}\n body:not(.display) #p76-landscape-nav{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:6px;margin:0 0 6px}\n body:not(.display) #p76-landscape-nav button{min-width:0;min-height:42px;padding:6px;font-size:14px;font-weight:800;line-height:1.15}\n body:not(.display) #p76-landscape-nav button[aria-pressed=true]{background:#ff6500;color:#080808;border-color:#ff6500}\n body:not(.display) #controls{height:calc(100dvh - 90px);overflow:hidden;margin:0;gap:8px;align-items:start}\n body:not(.display) #controls>.panel{display:none!important;max-height:100%;overflow-y:auto;padding:10px}\n body:not(.display) #controls h3{font-size:17px;margin:0 0 8px}\n body:not(.display) .p76-landscape-tools,body:not(.display) #message,body:not(.display) #recovery-note,body:not(.display) #board{display:none!important}\n body:not(.display)[data-p76-tab=match] #p76-shots,body:not(.display)[data-p76-tab=match] #p76-possession-panel,body:not(.display)[data-p76-tab=match] #p76-match-panel{display:block!important;grid-column:span 4}\n body:not(.display)[data-p76-tab=stats] #p76-stats-panel,body:not(.display)[data-p76-tab=stats] #p76-points{display:block!important;grid-column:span 6}\n body:not(.display)[data-p76-tab=timing] #p76-timing{display:grid!important;grid-column:1/-1;grid-template-columns:1.2fr 1fr 1fr;gap:8px;align-items:start}\n body:not(.display)[data-p76-tab=sounds] #p76-sounds-panel,body:not(.display)[data-p76-tab=teams] #p76-teams-panel{display:block!important;grid-column:1/-1}\n body:not(.display)[data-p76-tab=screen] .p76-landscape-tools{display:grid!important}\n body:not(.display)[data-p76-tab=screen].p76-show-preview #board{display:block!important;height:calc(100dvh - 160px);aspect-ratio:auto}\n body:not(.display)[data-p76-tab=screen].p76-show-links #links{display:grid!important}\n body:not(.display)[data-p76-tab=screen] #controls{display:none}\n body:not(.display) .p76-shot-buttons{display:grid;grid-template-columns:1fr 1fr;gap:8px}\n body:not(.display) .p76-shot-buttons button{min-height:54px;width:100%;font-size:17px;line-height:1.15;padding:8px 5px;white-space:normal}\n body:not(.display) #p76-possession{width:50%;min-width:115px;min-height:54px;padding:8px 5px;font-size:16px;line-height:1.15}\n body:not(.display) .p76-match-actions button,body:not(.display) #p76-global-pause{min-height:52px;font-size:16px;padding:7px 4px}\n body:not(.display) #p76-finish{min-height:44px;font-size:16px;margin-top:8px;padding:8px}\n body:not(.display) #p76-global-note{font-size:11px;line-height:1.25;margin-top:7px}\n body:not(.display) .p76-stat-controls{grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:6px}\n body:not(.display) .p76-stat-controls>div{padding:7px}\n body:not(.display) .p76-stat-controls h4{font-size:13px;line-height:1.15;margin:0 0 5px;overflow-wrap:anywhere}\n body:not(.display) .p76-stat-controls .line{gap:4px;padding:6px 0;min-height:49px}\n body:not(.display) .p76-stat-controls .line>span:first-child{font-size:11px;gap:3px;line-height:1.15}\n body:not(.display) .p76-stat-value{font-size:18px;line-height:1.1}\n body:not(.display) .p76-stat-controls .line>span:last-child{gap:4px}\n body:not(.display) .p76-stat-controls [data-field]{width:38px;min-width:38px;min-height:44px;height:44px;font-size:27px;padding:3px;line-height:1}\n body:not(.display) .p76-points-grid{gap:6px}\n body:not(.display) #p76-points .panel{padding:7px;border-radius:10px}\n body:not(.display) #p76-points .panel h3{font-size:14px;margin-bottom:7px}\n body:not(.display) .points{display:grid!important;grid-template-columns:1fr 1fr!important;gap:7px!important;margin:0}\n body:not(.display) .points button{font-size:24px;min-height:50px;padding:5px 2px}\n body:not(.display) #p76-timing h3{grid-column:1/-1}\n body:not(.display) #p76-timing>label{display:none}\n body:not(.display) #p76-timing .time-inputs{grid-column:1;grid-row:2/span 2;gap:6px}\n body:not(.display) #p76-timing .time-inputs input{min-height:44px;font-size:20px;padding:8px}\n body:not(.display) #p76-timing #settime{min-height:44px;font-size:15px}\n body:not(.display) #p76-timing #setperiod{grid-column:2;grid-row:2;min-height:44px;font-size:16px;padding:8px}\n body:not(.display) #p76-timing .bar:has(#next){grid-column:2;grid-row:3;margin:0}\n body:not(.display) #p76-timing .bar:has(#reset){grid-column:3;grid-row:2;margin:0}\n body:not(.display) #p76-timing .bar button{min-height:44px;font-size:15px;padding:8px}\n body:not(.display) #p76-timing>.muted{grid-column:3;grid-row:3;margin:0;font-size:11px;line-height:1.3}\n body:not(.display) #p76-team-config{grid-template-columns:1fr 1fr;gap:10px}\n body:not(.display) #p76-sounds-panel>.muted{margin:0 0 8px;font-size:12px}\n body:not(.display) .p76-audio-card{padding:8px}\n body:not(.display) .p76-audio-card h4{font-size:15px;margin-bottom:8px}\n body:not(.display) .p76-audio-card label{margin:4px 0;font-size:12px}\n body:not(.display) .p76-audio-card input{padding:6px;font-size:12px}\n body:not(.display) .p76-audio-card .bar{display:grid;grid-template-columns:1fr 1fr;margin:8px 0}\n body:not(.display) .p76-audio-card button{min-height:44px;padding:6px;font-size:13px}\n body:not(.display) .p76-audio-card p{font-size:11px;margin:6px 0}\n}\n';
  style.textContent+='\n@media(orientation:landscape) and (min-width:651px) and (max-width:1100px) and (max-height:360px){body:not(.display) #p76-global-note{display:none}body:not(.display) .points button{min-height:44px;font-size:23px}body:not(.display) #controls>.panel{padding:8px}body:not(.display) #controls h3{font-size:16px;margin-bottom:6px}}\n';
  style.textContent+='\n.p76-audio-actions{display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px}.p76-audio-actions button{min-height:44px;padding:8px;font-size:14px}\n.p76-audio-card p{margin:8px 0 0;font-size:12px;line-height:1.25}\n.p76-team-actions>details{margin-top:14px}\nbody.display #viewtools{left:10px;right:auto;display:flex;gap:5px;flex-direction:row;align-items:center}\nbody.display #viewtools button{font-size:12px;padding:6px 8px;min-height:30px;border-radius:6px}\n@media(orientation:landscape) and (min-width:651px) and (max-width:1100px) and (max-height:600px){\n body:not(.display) #p76-sounds-panel>.muted{font-size:11px;line-height:1.2;margin:0 0 6px}\n body:not(.display) .p76-audio-grid{gap:8px}\n body:not(.display) .p76-audio-card{padding:8px}\n body:not(.display) .p76-audio-card h4{font-size:14px;line-height:1.1;margin:0 0 7px}\n body:not(.display) .p76-audio-actions{gap:6px}\n body:not(.display) .p76-audio-actions button{min-height:44px;padding:5px 3px;font-size:12px;line-height:1.15}\n body:not(.display) .p76-audio-card p{font-size:11px;margin:6px 0 0;line-height:1.2;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\n body:not(.display) #p76-team-config{gap:8px}\n body:not(.display) .p76-team-card{display:grid;grid-template-columns:46px minmax(0,1fr);gap:5px 7px;padding:7px}\n body:not(.display) .p76-team-card h4{grid-column:1/-1;font-size:13px;line-height:1.1;margin:0}\n body:not(.display) .p76-team-card select{grid-column:1/-1;min-height:44px;height:44px;padding:6px;font-size:15px;margin:0}\n body:not(.display) .p76-team-row{grid-column:2;grid-row:3;gap:5px}\n body:not(.display) .p76-team-row input{height:44px;min-height:44px;padding:6px;font-size:15px}\n body:not(.display) .p76-team-row button{width:42px;min-height:44px;padding:4px;font-size:20px}\n body:not(.display) .p76-team-footer{grid-column:1;grid-row:3;position:relative;min-height:44px;height:44px;margin:0;display:flex}\n body:not(.display) .p76-config-preview{width:44px;height:44px}\n body:not(.display) .p76-remove{position:absolute;right:-3px;top:-5px;width:23px;height:23px;padding:0;font-size:19px;line-height:1;min-height:23px;border-radius:50%}\n body:not(.display) .p76-team-actions{display:grid;grid-template-columns:1fr 1fr;align-items:start;gap:8px;margin-top:7px}\n body:not(.display) #p76-save-teams{min-height:44px;height:44px;padding:7px!important;font-size:15px;margin:0!important}\n body:not(.display) .p76-team-actions>details{margin:0!important}\n body:not(.display) .p76-team-actions summary{display:flex;align-items:center;justify-content:center;min-height:44px;padding:7px;border:1px solid #394656;border-radius:8px;font-size:13px;cursor:pointer;background:#202a37}\n body:not(.display) .p76-team-actions>details[open]{position:fixed;inset:8px;z-index:200;overflow:auto;background:#000;padding:12px;border:2px solid #ff6500;border-radius:12px}\n body:not(.display) .p76-team-actions>details[open]>summary{position:sticky;top:0;border-color:#ff6500;z-index:1}\n body:not(.display)[data-p76-tab=screen] header{display:none}\n body:not(.display)[data-p76-tab=screen] main{position:relative;height:100dvh;padding:5px}\n body:not(.display)[data-p76-tab=screen] #p76-landscape-nav{position:absolute;top:4px;left:5px;right:5px;z-index:30;gap:5px}\n body:not(.display)[data-p76-tab=screen] #p76-landscape-nav button{min-height:30px;font-size:12px;padding:4px}\n body:not(.display)[data-p76-tab=screen] .p76-landscape-tools{position:absolute;top:43px;left:11px;z-index:20;display:flex!important;flex-direction:row;gap:5px;width:auto}\n body:not(.display)[data-p76-tab=screen] #p76-preview-toggle,body:not(.display)[data-p76-tab=screen] #p76-links-toggle{width:auto;min-height:28px;height:28px;margin:0;padding:4px 6px;font-size:11px;border-radius:6px}\n body:not(.display)[data-p76-tab=screen].p76-show-preview #board{position:absolute;top:39px;left:5px;width:calc(100% - 10px);height:calc(100dvh - 44px);margin:0;border-top-width:2px}\n body:not(.display)[data-p76-tab=screen].p76-show-links #links{position:absolute;left:10px;top:78px;width:350px;max-width:80vw;z-index:25;background:#000;border:1px solid #ff6500;border-radius:8px;padding:7px;grid-template-columns:1fr 1fr!important}\n body:not(.display)[data-p76-tab=screen] #links button,body:not(.display)[data-p76-tab=screen] #links .button{min-height:34px;font-size:11px;padding:5px}\n}\n@media(orientation:landscape) and (min-width:651px) and (max-width:1100px) and (max-height:360px){\n body:not(.display) #p76-teams-panel>h3{display:none}\n body:not(.display) .p76-team-card{padding:5px;gap:4px 6px}\n body:not(.display) .p76-team-card h4{font-size:12px}\n body:not(.display) .p76-team-card select,body:not(.display) .p76-team-row input,body:not(.display) .p76-team-row button{height:40px;min-height:40px;font-size:14px}\n body:not(.display) .p76-team-footer{height:40px;min-height:40px}\n body:not(.display) .p76-config-preview{height:40px;width:40px}\n body:not(.display) #p76-save-teams,body:not(.display) .p76-team-actions summary{height:40px;min-height:40px;font-size:13px}\n}\n';
  document.head.append(style);
  style.textContent+='\n@media(orientation:landscape) and (min-width:651px) and (max-width:1100px) and (max-height:600px){body:not(.display)[data-p76-tab=screen] .p76-landscape-tools{left:8px;top:45px;width:116px;flex-direction:column;align-items:stretch}body:not(.display)[data-p76-tab=screen] #p76-links-toggle,body:not(.display)[data-p76-tab=screen] #p76-preview-toggle{width:116px;height:auto;min-height:36px;white-space:normal}body:not(.display)[data-p76-tab=screen].p76-show-preview #board{left:132px;top:41px;width:calc(100% - 140px);height:calc(100dvh - 49px);border:1px solid #ff6500;border-radius:10px;box-sizing:border-box}body:not(.display)[data-p76-tab=screen].p76-show-links #links{top:126px;left:8px}}\n';
  const divider=document.createElement('div');divider.className='p76-score-divider';divider.setAttribute('aria-hidden','true');$('stage').append(divider);
  const final=document.createElement('div');final.id='p76-final';final.hidden=true;
  final.innerHTML='<img class="p76-final-brand" alt="Punto Deportivo 76"><div class="p76-final-title">FINAL DEL PARTIDO</div><div class="p76-final-frame"><div class="p76-final-team"><img id="p76-final-logo0" alt="Escudo local"><div class="p76-final-name" id="p76-final-name0"></div></div><div class="p76-final-scores"><span id="p76-final-score0"></span><span class="p76-final-dash">–</span><span id="p76-final-score1"></span></div><div class="p76-final-team"><img id="p76-final-logo1" alt="Escudo visitante"><div class="p76-final-name" id="p76-final-name1"></div></div></div><div class="p76-final-footer">PUNTO DEPORTIVO 76 · <b>STREAMING</b></div>';
  final.querySelector('.p76-final-brand').src=document.querySelector('.emblem img').getAttribute('src');$('stage').append(final);
  const alarm=document.createElement('div');alarm.id='p76-period-alarm';alarm.setAttribute('aria-hidden','true');document.body.append(alarm);
  const baseChange=change;
  change=function(mutator){
    const due=expiredClock();
    const observed=state&&state.running?(state.mainAlarmAt||state.stamp+state.seconds*1000):null;
    return baseChange(()=>{
      if(due)freezeExpiredClock(due);
      const beforeRunning=state.running,beforeSeconds=state.seconds,beforeDeadline=state.mainAlarmAt||observed;
      const oldPeriod=state.period,oldShotTeam=state.shot.team,oldPossession=state.possession;
      mutator();
      if(!state.running&&!state.finished&&!state.globalPause?.active&&state.seconds!==beforeSeconds)state.periodStarted=false;
      if(state.period!==oldPeriod){
        state.fouls=[0,0];state.timeouts=[0,0];state.statLocks=null;state.globalPause=null;state.periodStarted=false;state.shotAlarm=null;state.periodAlarm=null;
        state.running=false;state.shot={team:oldShotTeam??null,seconds:24,running:false,stamp:clockNow()};state.possession=oldPossession;
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
    if(state.globalPause?.active||state.finished||remaining()<=0)return;
    state.shotAlarm=null;
    const current=state.shot.team;
    state.shot={team:alternate?(current===0?1:0):(current===null?0:current),seconds,running:state.running,stamp:clockNow()};
  }

  function toggleGlobalPause(){
    const now=clockNow();
    if(state.globalPause?.active){
      const pause=state.globalPause;
      state.running=!!pause.mainWasRunning&&state.seconds>0;
      state.stamp=now;
      state.mainAlarmAt=state.running?now+state.seconds*1000:null;
      state.shot={...state.shot,running:!!pause.shotWasRunning&&state.shot.team!==null&&state.shot.seconds>0,stamp:now};
      state.globalPause=null;state.shotAlarm=null;
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
  function expiredClock(now=clockNow()){
    if(!state||state.finished||state.globalPause?.active)return null;
    const mainEnd=state.running?(state.mainAlarmAt||state.stamp+state.seconds*1000):Infinity;
    const shotEnd=state.shot?.running&&state.shot.team!==null?state.shot.stamp+state.shot.seconds*1000:Infinity;
    const at=Math.min(mainEnd,shotEnd);if(!Number.isFinite(at)||now<at)return null;
    return {kind:mainEnd<=shotEnd?'main':'shot',at};
  }
  function freezeExpiredClock(expiry){
    if(!expiry||state.finished||state.globalPause?.active)return;
    const mainWasRunning=state.running;
    const mainEnd=state.mainAlarmAt||state.stamp+state.seconds*1000;
    const shotEnd=state.shot.stamp+state.shot.seconds*1000;
    const mainSeconds=state.running?Math.max(0,(mainEnd-expiry.at)/1000):state.seconds;
    const shotSeconds=state.shot.running?Math.max(0,Math.min(24,(shotEnd-expiry.at)/1000)):state.shot.seconds;
    state.seconds=mainSeconds;state.running=false;state.stamp=expiry.at;state.mainAlarmAt=null;
    state.shot={...state.shot,seconds:shotSeconds,running:false,stamp:expiry.at};
    state.globalPause={active:true,mainWasRunning:mainWasRunning&&mainSeconds>0,shotWasRunning:false,reason:expiry.kind+'-expired'};
    if(expiry.kind==='shot'){const previous=state.shot.team;state.shotAlarm={at:expiry.at,team:previous};state.shot={team:previous===0?1:0,seconds:24,running:false,stamp:expiry.at};state.possession=state.shot.team;state.globalPause.shotWasRunning=true;}
    else {state.periodAlarm={at:expiry.at};state.shotAlarm=null;}
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
    state.periodStarted=true;state.globalPause=null;state.periodAlarm=null;state.shotAlarm=null;state.running=true;state.stamp=clockNow();state.mainAlarmAt=state.stamp+state.seconds*1000;const team=state.shot.team;state.shot={team,seconds:24,running:team!==null,stamp:state.stamp};
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
    for(const id of ['p76-shot24','p76-shot14'])if($(id))$(id).disabled=paused||ended||atZero;
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
    for(const kind of ['main','shot']){const label=$('p76-audio-label-'+kind);if(label)label.textContent=state.sounds?.[kind+'Name']||'Bocina estilo NBA (sintetizada)';}
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
    const end=state.periodAlarm?.at||state.mainAlarmAt||state.stamp+state.seconds*1000;
    const expired=inAlertWindow(!!state.periodAlarm||state.running,end,clockNow());
    alarm.classList.toggle('active',expired);
    $('board').classList.toggle('p76-period-warning',expired&&!view);
  }
  renderShot=function(){
    if(!state)return;
    const shot=state.shot,now=clockNow(),value=Math.ceil(shotRemaining());
    const expired=inAlertWindow(!!state.shotAlarm||shot.running,state.shotAlarm?.at||shot.stamp+shot.seconds*1000,now);
    for(let i=0;i<2;i++){
      const selected=shot.team===i,box=$('shot'+i);
      box.textContent=selected?value:24;
      box.classList.toggle('active',selected);box.classList.toggle('inactive',!selected);box.classList.remove('expired');
      box.classList.toggle('p76-shot-alarm',expired&&(state.shotAlarm?state.shotAlarm.team===i:selected));
      box.setAttribute('aria-disabled',String(!selected));
      box.setAttribute('aria-label',state.names[i]+': '+(selected?value:24)+' segundos');
    }
    updateMainAlarm();
    updateSoundAlarms();
    syncGlobalUI();
  };

  let audioContext=null,audioUnlocked=false,customAudio=null;
  const sounded=new Set();
  const decodedSounds=new Map();
  function safeSound(src){return typeof src==='string'&&src.length<450000&&/^data:audio\/[a-z0-9.+-]+(?:;[^,]*)?;base64,[a-z0-9+/=]+$/i.test(src)?src:'';}
  async function decodeSound(src){
    if(decodedSounds.has(src))return decodedSounds.get(src);
    const bytes=Uint8Array.from(atob(src.slice(src.indexOf(',')+1)),c=>c.charCodeAt(0));
    const pending=audioContext.decodeAudioData(bytes.buffer);decodedSounds.set(src,pending);
    try{const buffer=await pending;decodedSounds.set(src,buffer);if(decodedSounds.size>4)decodedSounds.delete(decodedSounds.keys().next().value);return buffer;}catch(error){decodedSounds.delete(src);throw error;}
  }
  function wavData(buffer){
    // Normalize any supported source to a short, portable PCM WAV.
    const rate=22050,length=Math.min(Math.ceil(buffer.duration*rate),rate*5);
    const bytes=new ArrayBuffer(44+length*2),v=new DataView(bytes);
    const word=(at,value)=>{for(let i=0;i<value.length;i++)v.setUint8(at+i,value.charCodeAt(i));};
    word(0,'RIFF');v.setUint32(4,36+length*2,true);word(8,'WAVE');word(12,'fmt ');v.setUint32(16,16,true);v.setUint16(20,1,true);v.setUint16(22,1,true);v.setUint32(24,rate,true);v.setUint32(28,rate*2,true);v.setUint16(32,2,true);v.setUint16(34,16,true);word(36,'data');v.setUint32(40,length*2,true);
    const channels=Array.from({length:buffer.numberOfChannels},(_,i)=>buffer.getChannelData(i));
    for(let i=0;i<length;i++){const at=i*buffer.sampleRate/rate,lo=Math.floor(at),hi=Math.min(lo+1,buffer.length-1),f=at-lo;let sample=0;for(const c of channels)sample+=(c[lo]||0)*(1-f)+(c[hi]||0)*f;sample=Math.max(-1,Math.min(1,sample/channels.length));v.setInt16(44+i*2,sample*(sample<0?32768:32767),true);}
    let binary='';for(const n of new Uint8Array(bytes))binary+=String.fromCharCode(n);
    return 'data:audio/wav;base64,'+btoa(binary);
  }
  async function unlockAudio(){
    const AudioContext=window.AudioContext||window.webkitAudioContext;
    if(!AudioContext){message('Este navegador no permite activar la bocina. Prueba con Chrome.');return false;}
    if(!audioContext)audioContext=new AudioContext();
    try{await audioContext.resume();audioUnlocked=audioContext.state==='running';}catch{audioUnlocked=false;}
    if(audioUnlocked){
      const now=clockNow();
      if(state&&(state.running||state.periodAlarm)&&remaining()<=0)sounded.add('main:'+(state.periodAlarm?.at||state.mainAlarmAt));
      if(state&&(state.shot?.running||state.shotAlarm)&&shotRemaining()<=0)sounded.add('shot:'+Math.round(state.shotAlarm?.at||state.shot.stamp+state.shot.seconds*1000));
    }
    const b=$('p76-enable-sound');if(b){b.textContent=audioUnlocked?'Sonido activado':'Activar sonido';b.disabled=audioUnlocked;}
    return audioUnlocked;
  }
  function playHorn(kind){
    if(!audioUnlocked||!audioContext)return;
    const src=safeSound(state?.sounds?.[kind]);
    if(src){
      decodeSound(src).then(buffer=>{
        if(customAudio){try{customAudio.stop();}catch{}}
        const source=audioContext.createBufferSource();source.buffer=buffer;source.connect(audioContext.destination);source.start();source.stop(audioContext.currentTime+Math.min(5,buffer.duration));customAudio=source;
      }).catch(()=>message('No se puede reproducir el audio guardado. Vuelve a cargarlo en Sonidos.'));
      return;
    }
    const now=audioContext.currentTime,duration=kind==='main'?1.8:.8;
    const gain=audioContext.createGain(),filter=audioContext.createBiquadFilter();
    filter.type='lowpass';filter.frequency.value=kind==='main'?1600:4200;filter.Q.value=.7;
    gain.gain.setValueAtTime(.001,now);gain.gain.exponentialRampToValueAtTime(kind==='main'?.16:.12,now+.015);gain.gain.setValueAtTime(kind==='main'?.16:.12,now+duration-.06);gain.gain.exponentialRampToValueAtTime(.001,now+duration);gain.connect(filter);filter.connect(audioContext.destination);
    const frequencies=kind==='main'?[220,330,440]:[880,1760];
    frequencies.forEach((frequency,i)=>{const oscillator=audioContext.createOscillator();oscillator.type=kind==='main'?'sawtooth':'square';oscillator.frequency.value=frequency;oscillator.detune.value=i%2?3:-3;oscillator.connect(gain);oscillator.start(now);oscillator.stop(now+duration);});
  }

  function updateSoundAlarms(){
    if(!state||state.finished||!audioUnlocked||!view)return;
    for(const kind of ['main','shot']){const src=safeSound(state.sounds?.[kind]);if(src&&!decodedSounds.has(src))decodeSound(src).catch(()=>{});}
    const now=clockNow(),mainEnd=state.periodAlarm?.at||state.mainAlarmAt||state.stamp+state.seconds*1000,shotEnd=state.shotAlarm?.at||state.shot.stamp+state.shot.seconds*1000;
    const alarms=[['main',!!state.periodAlarm||state.running,mainEnd,'main:'+Math.round(mainEnd)],['shot',!!state.shotAlarm||state.shot.running,shotEnd,'shot:'+Math.round(shotEnd)]];
    for(const [kind,running,end,id] of alarms){if(inAlertWindow(running,end,now)&&!sounded.has(id)){sounded.add(id);playHorn(kind);}}
    if(sounded.size>100){const last=[...sounded].slice(-50);sounded.clear();last.forEach(id=>sounded.add(id));}
  }
  function installSounds(){
    const section=document.createElement('section');section.className='panel wide';section.id='p76-sounds-panel';
    section.innerHTML='<h3>Sonidos</h3><p class="muted small">Carga tu bocina (máx. 10 MB). Se guardan hasta 5 segundos de audio en la base del partido.</p><div class="p76-audio-grid" id="p76-audio-grid"></div>';
    for(const [kind,label] of [['main','Fin de período'],['shot','Fin de 24 / 14 segundos']]){
      const box=document.createElement('div');box.className='p76-audio-card';
      box.innerHTML='<h4>'+label+'</h4><input type="file" accept="audio/*" id="p76-audio-'+kind+'" hidden><div class="p76-audio-actions"><button id="p76-upload-audio-'+kind+'">Cargar audio</button><button id="p76-test-'+kind+'">Probar</button><button id="p76-default-'+kind+'">Restablecer</button></div><p class="muted small" id="p76-audio-label-'+kind+'"></p>';
      section.querySelector('#p76-audio-grid').append(box);
      box.querySelector('#p76-upload-audio-'+kind).onclick=()=>box.querySelector('#p76-audio-'+kind).click();
      box.querySelector('#p76-test-'+kind).onclick=async()=>{if(await unlockAudio())playHorn(kind);};
      box.querySelector('#p76-default-'+kind).onclick=()=>change(()=>{state.sounds={...state.sounds,[kind]:null,[kind+'Name']:null};});
      box.querySelector('#p76-audio-'+kind).onchange=async event=>{
        const file=event.target.files[0];if(!file)return;
        if(file.size>10000000){message('Elige un audio de hasta 10 MB.');event.target.value='';return;}
        const upload=box.querySelector('#p76-upload-audio-'+kind);upload.disabled=true;
        try{
          if(!await unlockAudio())throw new Error('Activa el sonido antes de cargar el archivo.');
          message('Preparando audio…');
          let buffer;try{buffer=await audioContext.decodeAudioData(await file.arrayBuffer());}catch{throw new Error('Este archivo no se puede reproducir. Prueba MP3 o WAV.');}
          if(!buffer.length||buffer.duration<=0)throw new Error('El archivo de audio está vacío.');
          const src=wavData(buffer);await decodeSound(src);
          await change(()=>{state.sounds={...state.sounds,[kind]:src,[kind+'Name']:file.name.slice(0,100)};});
          if(pendingSave||!connected)throw new Error('Audio pendiente de guardar: revisa la conexión y espera Cambios guardados.');
          const saved=await request('/api/game/'+id);
          if(saved.sounds?.[kind]!==src)throw new Error('No se confirmó el audio en la base. Vuelve a cargarlo.');
          message('Audio guardado en la base del partido. Pulsa Probar para escucharlo.');
        }catch(error){message(error.message||'No se pudo guardar el sonido.');}finally{upload.disabled=false;event.target.value='';}

      };
    }
    return section;
  }
  function installLandscapeNav(){
    const nav=document.createElement('nav');nav.id='p76-landscape-nav';nav.setAttribute('aria-label','Secciones del control');
    for(const [tab,label] of [['match','Partido'],['stats','Faltas / puntos'],['timing','Reloj'],['sounds','Sonidos'],['teams','Equipos'],['screen','Pantalla']]){
      const b=document.createElement('button');b.textContent=label;b.dataset.tab=tab;b.setAttribute('aria-pressed',String(tab==='match'));
      b.onclick=()=>{document.body.dataset.p76Tab=tab;if(tab==='screen'){document.body.classList.add('p76-show-preview');const toggle=$('p76-preview-toggle');if(toggle){toggle.textContent='Ocultar tablero';toggle.setAttribute('aria-expanded','true');}}nav.querySelectorAll('button').forEach(button=>button.setAttribute('aria-pressed',String(button===b)));fitBoard();};nav.append(b);
    }
    document.body.dataset.p76Tab='match';$('links').before(nav);
  }
  const audioEnable=document.createElement('button');audioEnable.id='p76-enable-sound';audioEnable.textContent='Activar sonido';audioEnable.onclick=unlockAudio;
  if(view){$('viewtools').append(audioEnable);}else{$('links').append(audioEnable);}

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
    $('p76-start').onclick=()=>{unlockAudio();change(startPeriod);};
    $('p76-global-pause').onclick=()=>{const due=expiredClock();if(due){change(()=>freezeExpiredClock(due));return;}if(startedPeriod()&&!state.finished&&remaining()>0)change(toggleGlobalPause);};
    $('p76-finish').onclick=()=>{if(confirm('¿Terminar el partido y mostrar el marcador final?'))change(finishMatch);};
    const timing=sectionWith('Reloj y período');timing.id='p76-timing';$('toggle').remove();
    const points=document.createElement('section');points.className='panel wide';points.id='p76-points';points.innerHTML='<h3>Puntaje</h3><div class="p76-points-grid" id="p76-points-grid"></div>';
    $('controls').append(points);$('p76-points-grid').append($('team-control0'),$('team-control1'));
    const teamActions=document.createElement('div');teamActions.className='p76-team-actions';teamActions.append($('p76-save-teams'),teams.querySelector('details'));teams.append(teamActions);
    const sounds=installSounds();installLandscapeNav();
    const ordered=[shots,possession,pauseSection,statsSection,points,timing,sounds,teams];
    ordered.filter(Boolean).forEach(section=>$('controls').append(section));
    const previewButton=document.createElement('button');previewButton.id='p76-preview-toggle';previewButton.textContent='Mostrar tablero';previewButton.setAttribute('aria-expanded','false');
    const landscapeTools=document.createElement('div');landscapeTools.className='p76-landscape-tools';
    const linksButton=document.createElement('button');linksButton.id='p76-links-toggle';linksButton.textContent='Enlaces del partido';linksButton.setAttribute('aria-expanded','false');
    linksButton.onclick=()=>{const open=document.body.classList.toggle('p76-show-links');linksButton.setAttribute('aria-expanded',String(open));};
    landscapeTools.append(linksButton,previewButton);$('board').before(landscapeTools);previewButton.onclick=()=>{const visible=document.body.classList.toggle('p76-show-preview');previewButton.textContent=visible?'Ocultar tablero':'Mostrar tablero';previewButton.setAttribute('aria-expanded',String(visible));fitBoard();};
    const resetButton=$('reset');resetButton.onclick=()=>{
      if(!confirm('¿Reiniciar el partido? Se borrarán nombres, escudos, puntos, faltas y tiempos de este encuentro. El catálogo se conserva.'))return;
      change(()=>{
        const sounds=state.sounds||{};
        state={names:['LOCAL','VISITA'],logos:['',''],sounds,scores:[0,0],fouls:[0,0],timeouts:[0,0],period:1,seconds:600,running:false,stamp:clockNow(),possession:null,shot:freshShot(),finished:false,finalResult:null,globalPause:null,periodStarted:false,statLocks:null,mainAlarmAt:null,shotAlarm:null,periodAlarm:null};
        for(let i=0;i<2;i++){drafts[i]={name:state.names[i],logo:''};$('p76-team-name'+i).value=state.names[i];$('p76-catalog'+i).value='';previewDraft(i);}
        $('minutes').value='10';$('seconds').value='0';$('setperiod').value='1';sounded.clear();
      });
    };
    syncGlobalUI();

    updateCatalog();connectCatalog();
  }
  const baseRender=render;
  render=function(){
    const expiry=expiredClock();
    if(expiry){
      if(key){change(()=>freezeExpiredClock(expiry));return;}
      freezeExpiredClock(expiry);
    }
    baseRender();syncGlobalUI();
  };
  const baseBuild=buildControls;
  buildControls=function(){baseBuild();installUI();};
  installUI();render();
})();

