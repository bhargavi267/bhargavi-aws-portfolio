(() => {
  "use strict";
  const canvas = document.getElementById("game");
  const ctx = canvas.getContext("2d");
  const overlay = document.getElementById("start-overlay");
  const toast = document.getElementById("toast");
  const keys = new Set();
  const world = { running:false, won:false, player:{x:95,y:315,r:15}, crystals:[
    {id:"cloud",x:285,y:145,label:"CLOUD",color:"#76e4e2",got:false},
    {id:"linux",x:565,y:285,label:"LINUX",color:"#b5a5ff",got:false},
    {id:"python",x:810,y:145,label:"PYTHON",color:"#ffd88a",got:false}
  ], clouds:[] };
  for(let i=0;i<9;i++) world.clouds.push({x:(i*137+35)%960,y:35+(i*71)%115,s:0.7+(i%3)*0.25});
  let toastTimer;
  const collected = () => world.crystals.filter(c=>c.got).length;
  function say(message){toast.textContent=message;toast.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove("show"),1900)}
  function updateHUD(){
    document.getElementById("crystal-count").textContent=collected()+" / 3";
    world.crystals.forEach(c=>document.getElementById("slot-"+c.id).classList.toggle("collected",c.got));
    document.querySelectorAll(".zone-card").forEach(card=>{
      const id=card.dataset.zone, crystal=world.crystals.find(c=>c.id===id), unlocked=crystal.got;
      card.classList.toggle("locked",!unlocked);card.classList.toggle("unlocked",unlocked);
      card.querySelector(".zone-lock").textContent=unlocked?"✦ ZONE UNLOCKED · OPEN":"🔒 COLLECT "+id.toUpperCase()+" CRYSTAL";
    });
  }
  function roundedRect(x,y,w,h,r,color){ctx.fillStyle=color;ctx.beginPath();ctx.roundRect(x,y,w,h,r);ctx.fill()}
  function drawCloud(x,y,s){
    ctx.fillStyle="rgba(209,230,255,.16)";ctx.beginPath();ctx.arc(x,y,17*s,0,Math.PI*2);ctx.arc(x+19*s,y-8*s,22*s,0,Math.PI*2);ctx.arc(x+42*s,y,16*s,0,Math.PI*2);ctx.fill();
  }
  function draw(){
    const g=ctx.createLinearGradient(0,0,0,440);g.addColorStop(0,"#1c3154");g.addColorStop(1,"#345879");ctx.fillStyle=g;ctx.fillRect(0,0,960,440);
    ctx.fillStyle="rgba(190,221,255,.75)";for(let i=0;i<65;i++){let x=(i*157)%950,y=(i*83)%205;ctx.fillRect(x,y,2,2)}
    world.clouds.forEach(c=>drawCloud(c.x,c.y,c.s));
    // distant floating islands
    roundedRect(35,220,120,35,16,"#314e68");roundedRect(750,230,165,40,18,"#314e68");
    // main island
    ctx.fillStyle="#276b70";ctx.beginPath();ctx.moveTo(70,295);ctx.quadraticCurveTo(140,220,280,245);ctx.quadraticCurveTo(420,205,535,245);ctx.quadraticCurveTo(700,205,870,270);ctx.quadraticCurveTo(920,300,885,340);ctx.lineTo(830,390);ctx.lineTo(180,390);ctx.lineTo(95,350);ctx.closePath();ctx.fill();
    ctx.fillStyle="#4b9a83";ctx.beginPath();ctx.moveTo(70,295);ctx.quadraticCurveTo(140,220,280,245);ctx.quadraticCurveTo(420,205,535,245);ctx.quadraticCurveTo(700,205,870,270);ctx.quadraticCurveTo(920,300,885,325);ctx.quadraticCurveTo(700,285,535,300);ctx.quadraticCurveTo(300,270,100,330);ctx.closePath();ctx.fill();
    // paths and patches
    ctx.strokeStyle="rgba(224,214,157,.45)";ctx.lineWidth=17;ctx.lineCap="round";ctx.beginPath();ctx.moveTo(105,320);ctx.quadraticCurveTo(300,260,430,315);ctx.quadraticCurveTo(650,370,850,300);ctx.stroke();
    for(let i=0;i<22;i++){let x=100+(i*37)%760,y=270+(i*29)%82;ctx.fillStyle=i%2?"#70b88b":"#8ac69b";ctx.fillRect(x,y,5,3)}
    // small trees
    [[175,267],[220,280],[450,260],[700,265],[765,280]].forEach(([x,y],i)=>{ctx.fillStyle="#694f61";ctx.fillRect(x-4,y,8,24);ctx.fillStyle=i%2?"#2e826f":"#367f69";ctx.beginPath();ctx.arc(x,y-4,16,0,Math.PI*2);ctx.fill();ctx.fillStyle="#6fc39b";ctx.beginPath();ctx.arc(x-5,y-9,7,0,Math.PI*2);ctx.fill()});
    // workshop
    ctx.fillStyle="#f1c78f";ctx.fillRect(360,258,66,54);ctx.fillStyle="#8e7188";ctx.beginPath();ctx.moveTo(350,260);ctx.lineTo(393,225);ctx.lineTo(437,260);ctx.closePath();ctx.fill();ctx.fillStyle="#243a5a";ctx.fillRect(385,281,17,31);ctx.fillStyle="#a6eff0";ctx.fillRect(366,273,12,12);
    // crystals
    world.crystals.forEach(c=>{
      if(c.got)return;ctx.save();ctx.translate(c.x,c.y);ctx.shadowColor=c.color;ctx.shadowBlur=22;ctx.fillStyle=c.color;ctx.beginPath();ctx.moveTo(0,-19);ctx.lineTo(13,-4);ctx.lineTo(8,18);ctx.lineTo(-8,18);ctx.lineTo(-13,-4);ctx.closePath();ctx.fill();ctx.shadowBlur=0;ctx.fillStyle="rgba(255,255,255,.65)";ctx.beginPath();ctx.moveTo(0,-14);ctx.lineTo(3,1);ctx.lineTo(-5,12);ctx.lineTo(-8,-4);ctx.closePath();ctx.fill();ctx.fillStyle="#eaf6ff";ctx.font="10px monospace";ctx.textAlign="center";ctx.fillText(c.label,0,34);ctx.restore();
    });
    // player shadow and explorer
    const p=world.player;ctx.fillStyle="rgba(5,14,27,.3)";ctx.beginPath();ctx.ellipse(p.x,p.y+16,15,6,0,0,Math.PI*2);ctx.fill();
    ctx.fillStyle="#ffd49a";ctx.beginPath();ctx.arc(p.x,p.y-5,12,0,Math.PI*2);ctx.fill();ctx.fillStyle="#26375c";ctx.fillRect(p.x-11,p.y+5,22,17);ctx.fillStyle="#fff";ctx.fillRect(p.x-6,p.y-8,3,3);ctx.fillRect(p.x+4,p.y-8,3,3);ctx.fillStyle="#76e4e2";ctx.fillRect(p.x-12,p.y+4,24,5);
    // instructions
    ctx.fillStyle="rgba(12,22,40,.65)";ctx.fillRect(18,18,205,28);ctx.fillStyle="#dceaff";ctx.font="11px monospace";ctx.textAlign="left";ctx.fillText("MOVE  ·  FIND THE CRYSTALS",29,36);
  }
  function frame(){
    if(world.running){
      const p=world.player,speed=2.7;let dx=0,dy=0;
      if(keys.has("ArrowLeft")||keys.has("a"))dx--;if(keys.has("ArrowRight")||keys.has("d"))dx++;
      if(keys.has("ArrowUp")||keys.has("w"))dy--;if(keys.has("ArrowDown")||keys.has("s"))dy++;
      if(dx&&dy){dx*=.707;dy*=.707}p.x=Math.max(35,Math.min(925,p.x+dx*speed));p.y=Math.max(215,Math.min(365,p.y+dy*speed));
      world.crystals.forEach(c=>{if(!c.got&&Math.hypot(p.x-c.x,p.y-c.y)<31){c.got=true;updateHUD();say(c.label+" CRYSTAL COLLECTED!");if(collected()===3){world.won=true;say("ALL CRYSTALS FOUND — QUEST COMPLETE!");document.getElementById("game-state").textContent="QUEST COMPLETE";}}});
    }
    draw();requestAnimationFrame(frame);
  }
  document.getElementById("start-game").addEventListener("click",()=>{world.running=true;overlay.classList.add("hidden");document.getElementById("game-state").textContent="EXPLORING";say("Use WASD or arrow keys to move.")});
  document.getElementById("reset-game").addEventListener("click",()=>{world.running=false;world.won=false;world.player={x:95,y:315,r:15};world.crystals.forEach(c=>c.got=false);keys.clear();overlay.classList.remove("hidden");document.getElementById("game-state").textContent="WORLD READY";updateHUD();document.getElementById("zone-detail").hidden=true});
  window.addEventListener("keydown",e=>{if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"," "].includes(e.key))e.preventDefault();keys.add(e.key.toLowerCase())});
  window.addEventListener("keyup",e=>keys.delete(e.key.toLowerCase()));
  window.addEventListener("blur",()=>keys.clear());
  document.querySelectorAll("[data-move]").forEach(btn=>{
    const key={up:"ArrowUp",down:"ArrowDown",left:"ArrowLeft",right:"ArrowRight"}[btn.dataset.move];
    btn.addEventListener("pointerdown",e=>{e.preventDefault();keys.add(key)});["pointerup","pointerleave","pointercancel"].forEach(ev=>btn.addEventListener(ev,()=>keys.delete(key)));
  });
  const zoneContent={
    cloud:{title:"Cloud Heights · Skills unlocked",body:"AWS fundamentals: EC2, S3, IAM, Lambda, SNS, VPC, Application Load Balancer and Amplify. Bhargavi has hosted a static website on S3 and deployed this portfolio using AWS Amplify.",tags:"AWS · EC2 · S3 · IAM · Lambda · SNS · VPC · Amplify"},
    linux:{title:"Linux Caverns · Skills unlocked",body:"Practising on Ubuntu, working with the command line and learning basic server administration. This area is still growing through hands-on experiments.",tags:"Linux · Ubuntu · CLI · Server basics"},
    python:{title:"Code Forest · Skills unlocked",body:"Python scripts with boto3 for AWS workflows, alongside C for core programming practice. Focused on small, readable programs that solve useful problems.",tags:"Python · boto3 · C · HTML · CSS · SQL"}
  };
  document.querySelectorAll(".zone-card").forEach(card=>card.addEventListener("click",()=>{
    const c=world.crystals.find(x=>x.id===card.dataset.zone);if(!c.got){say("Collect the "+c.label+" crystal first.");return}
    const data=zoneContent[c.id],panel=document.getElementById("zone-detail");panel.hidden=false;panel.innerHTML='<button class="close-detail" aria-label="Close">✕</button><p class="eyebrow">UNLOCKED AREA</p><h3>'+data.title+'</h3><p>'+data.body+'</p><p class="terminal-line">'+data.tags+'</p>';panel.querySelector("button").addEventListener("click",()=>panel.hidden=true);
  }));
  const choices=document.getElementById("choices"),feedback=document.getElementById("feedback"),retry=document.getElementById("retry");
  choices.addEventListener("click",e=>{const b=e.target.closest("button");if(!b)return;choices.querySelectorAll("button").forEach(x=>x.disabled=true);b.classList.add("chosen");if(b.dataset.answer==="right"){feedback.className="challenge-feedback good";feedback.textContent="Correct! Verify ownership and usage, protect the data with a backup, then stop the resource with approval. Stopping is reversible; deleting may not be."}else{feedback.className="challenge-feedback bad";feedback.textContent="Not the safest move. First confirm ownership and production impact, preserve any needed data, and get approval before stopping. Never delete blindly or grant excessive permissions."}retry.hidden=false});
  retry.addEventListener("click",()=>{choices.querySelectorAll("button").forEach(x=>{x.disabled=false;x.classList.remove("chosen")});feedback.className="challenge-feedback";feedback.textContent="Select an action to see what happens.";retry.hidden=true});
  updateHUD();frame();
})();