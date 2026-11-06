(function(){
'use strict';
var $=function(s){return document.querySelector(s)};
var DATA=[
 {n:'dev-test-box',t:'EC2 t3.micro',tag:'owner=me, env=test',use:'CPU 0% for 19 days. No logins.',r:1.2,f:1,why:'Idle test server nobody uses.'},
 {n:'eip-old-demo',t:'Elastic IP',tag:'none',use:'Not attached to anything.',r:0.5,f:1,why:'An unattached Elastic IP still costs money.'},
 {n:'old-data-vol',t:'EBS volume',tag:'env=test',use:'Detached 40 days ago. Last read: never.',r:0.7,f:1,why:'Detached volumes keep billing. (In real life, snapshot it first.)'},
 {n:'practice-db',t:'RDS db.t3.micro',tag:'owner=me, env=dev',use:'0 connections for 2 weeks.',r:1.6,f:1,why:'A forgotten practice database.'},
 {n:'nat-unused-vpc',t:'NAT gateway',tag:'vpc=experiment-1',use:'0 bytes processed this week.',r:1.4,f:1,why:'NAT gateways bill by the hour even when idle.'},
 {n:'web-prod',t:'EC2 t3.small',tag:'env=production',use:'CPU 41%. Serving visitors now.',r:0.9,f:0,why:'This runs the live site.'},
 {n:'app-db',t:'RDS db.t3.small',tag:'env=production',use:'14 active connections.',r:1.1,f:0,why:'This database is in use.'},
 {n:'alb-main',t:'Load balancer',tag:'env=production',use:'Healthy targets. 2.3k requests/hour.',r:0.6,f:0,why:'This balances live traffic.'}
];
var LIMIT=45,st,timer;
function money(x){return '$'+x.toFixed(2)}
function shuffle(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=a[i];a[i]=a[j];a[j]=t}return a}
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;')}
function left(){return st.items.filter(function(x){return x.f&&x.on}).length}
function hud(){$('#h-bill').textContent=money(st.bill);$('#h-time').textContent=st.t;$('#h-left').textContent=left()}
function start(){
  clearInterval(timer);
  st={bill:0,t:LIMIT,out:0,saved:0,sel:null,done:false,items:shuffle(DATA).map(function(d){return Object.assign({on:true},d)})};
  $('#h-res').textContent='';
  var g=$('#h-grid');g.hidden=false;
  g.innerHTML=st.items.map(function(x,i){return '<button type="button" class="res on" data-i="'+i+'" aria-label="'+esc(x.n)+', '+esc(x.t)+', running"><b>'+esc(x.n)+'</b><br>'+esc(x.t)+'</button>'}).join('');
  $('#h-info').textContent='Pick a resource to inspect it.';
  $('#h-start').textContent='Restart';
  hud();
  timer=setInterval(tick,1000);
}
function tick(){
  st.items.forEach(function(x){if(x.on)st.bill+=x.r});
  st.t--;hud();
  if(st.t<=0)end();
}
function inspect(i){
  var x=st.items[i];st.sel=i;
  [].forEach.call(document.querySelectorAll('.res'),function(b,j){b.classList.toggle('sel',j===i)});
  $('#h-info').innerHTML='<b>'+esc(x.n)+'</b> ('+esc(x.t)+')<dl><dt>Tags</dt><dd>'+esc(x.tag)+'</dd><dt>Usage</dt><dd>'+esc(x.use)+'</dd><dt>Costs</dt><dd>'+money(x.r)+' per second (pretend)</dd></dl>'+
   (x.on?'<div class="row"><button class="btn" type="button" id="h-stop">Stop it</button><button class="btn ghost" type="button" id="h-keep">Keep running</button></div>':'<p>Already stopped. You can start it again later in real AWS.</p>');
}
function stop(){
  var x=st.items[st.sel],b=document.querySelectorAll('.res')[st.sel];
  x.on=false;b.classList.remove('on');b.classList.add('off');b.setAttribute('aria-label',x.n+', stopped');
  if(x.f){$('#h-info').innerHTML='<b>Good stop.</b> '+esc(x.why)+' That saves '+money(x.r)+' every second.'}
  else{st.out++;st.bill+=8;$('#h-info').innerHTML='<b>Outage!</b> '+esc(x.why)+' Real users would have noticed. Always check usage and tags, and ask the owner first.'}
  hud();if(!left())end();
}
function keep(){
  var x=st.items[st.sel];
  $('#h-info').innerHTML=x.f?'<b>Still costing you.</b> '+money(x.r)+' per second and nobody is using it. Look again at the clues.':'<b>Good call.</b> '+esc(x.why);
}
function end(){
  if(st.done)return;st.done=true;clearInterval(timer);
  var l=left(),won=!l;
  $('#h-res').innerHTML='<span class="big">'+(won?'All forgotten servers stopped!':'Time is up.')+'</span>Final bill: '+money(st.bill)+'. Forgotten resources still running: '+l+'. Production outages: '+st.out+'.<br>'+
   (st.out?'Next time, read the tags and usage before stopping. ':'')+'That check-before-you-stop habit is the idea behind my AWS Cost Guardian concept: alert, ask approval, then stop, never delete.';
  $('#h-info').textContent='Round over. Press Restart to play again.';
}
$('#h-start').addEventListener('click',start);
$('#h-grid').addEventListener('click',function(e){var b=e.target.closest('.res');if(b&&!st.done)inspect(+b.dataset.i)});
$('#h-info').addEventListener('click',function(e){if(st.done)return;if(e.target.id==='h-stop')stop();if(e.target.id==='h-keep')keep()});
})();
