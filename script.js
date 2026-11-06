(function(){
'use strict';
var $=function(s){return document.querySelector(s)};

/* Hero flask */
var tags=['Cloud','Linux','Python','Product'],colors=['#ffd9e6','#cdf3e4','#e7defb','#ffe9b8'],mi=0;
$('#mix').addEventListener('click',function(){
  mi=(mi+1)%tags.length;
  $('#tag').textContent=tags[mi];
  $('#liquid').style.background=colors[mi];
  $('#mixout').textContent='Experiment mixed: '+tags[mi];
});

/* Problem wall */
var chains={
 memo:[['Problem','I kept forgetting what I had studied.'],['Idea','Practice recall instead of rereading.'],['Experiment','Flashcards, quizzes and daily reminders.'],['Result','NekoMemo, live to try.']],
 cost:[['Problem','Forgotten AWS resources can cause surprise bills.'],['Idea','Warn first, and ask before stopping anything.'],['Experiment','Designing around email alerts and least-privilege IAM.'],['Result','AWS Cost Guardian: a concept, still in development.']],
 learn:[['Problem','Cloud services stay abstract when I only read about them.'],['Idea','Use each service once, on a tiny task.'],['Experiment','Hosted a site on S3; wired Lambda, S3 and SNS.'],['Result','Hands-on labs and a clearer mental map of AWS.']],
 farm:[['Problem','Farmers may struggle to identify what is affecting a crop.'],['Idea','Make it easier to investigate a crop issue from a photo.'],['Experiment','A user shares a crop image; the app analyses possible disease and presents suggested next steps.'],['Result','Farmora: an AI-assisted crop-support project. Model accuracy and agronomy advice need validation before real-world use.']]
};
function showChain(k){
  $('#chain').innerHTML=chains[k].map(function(c){return '<li><b>'+c[0]+'</b>'+c[1]+'</li>'}).join('');
}
function tabs(sel,cb){
  var t=[].slice.call(document.querySelectorAll(sel));
  function pick(el){t.forEach(function(x){x.setAttribute('aria-selected',x===el);x.tabIndex=x===el?0:-1});cb(el.dataset.k);}
  t.forEach(function(el,i){
    el.addEventListener('click',function(){pick(el)});
    el.addEventListener('keydown',function(e){
      var n=e.key==='ArrowRight'?1:e.key==='ArrowLeft'?-1:0;
      if(n){var nx=t[(i+n+t.length)%t.length];nx.focus();pick(nx);e.preventDefault();}
    });
  });
  pick(t[0]);
}
tabs('.pin',showChain);

/* Benches */
var bench={
 cloud:{b:'Hosted a static site on S3, connected Lambda, S3 and SNS in one workflow, and deployed this site with AWS Amplify.',l:'How object storage, event-driven automation and a deploy pipeline fit together.'},
 linux:{b:'Practised on Ubuntu and the command line, and set up basic servers.',l:'Linux fundamentals and basic server administration. This bench is still growing.'},
 code:{b:'Python scripts that talk to AWS with boto3, plus C for core programming practice.',l:'Writing small, readable programs that do one useful thing.'},
 prod:{b:'NekoMemo, a revision app, and AWS Cost Guardian, a cost-awareness concept.',l:'Starting from a real problem, keeping the first version small, and being honest about status.'}
};
tabs('.benches button',function(k){
  $('#bench').setAttribute('aria-labelledby','b-'+k);
  $('#bench').innerHTML='<div><h4>What I built</h4><p>'+bench[k].b+'</p></div><div><h4>What I learned</h4><p>'+bench[k].l+'</p></div>';
});

/* Build journey */
var steps=[['Problem','Notice something that wastes time or money.'],['Research','Read the docs and see how others solved it.'],['Experiment','Try the smallest version in a throwaway setup.'],['Build','Turn what worked into a real project.'],['Test','Break it on purpose and check every button.'],['Improve','Fix what I found and write down what I learned.']];
$('#steps').innerHTML=steps.map(function(s,i){return '<li><button type="button" data-i="'+i+'">'+s[0]+'</button></li>'}).join('');
function step(i){
  [].forEach.call(document.querySelectorAll('#steps button'),function(b,j){j===i?b.setAttribute('aria-current','true'):b.removeAttribute('aria-current')});
  $('#step-text').textContent=steps[i][1];
}
$('#steps').addEventListener('click',function(e){if(e.target.dataset.i)step(+e.target.dataset.i)});
step(0);

/* Challenge */
var opts=[
 {t:'Terminate it right now',c:'bad',m:'Terminating is permanent, and the unsaved folder is gone. Cost Guardian rule: never delete without approval.'},
 {t:'Check the owner tag, copy the folder, then stop it',c:'good',m:'Best choice. You confirmed it is yours, saved your data, and stopped the instance instead of deleting it, so you can start it again.'},
 {t:'Ignore it until morning',c:'bad',m:'A running instance keeps billing. Waiting is the exact mistake an alert is meant to prevent.'},
 {t:'Give a script full admin rights to clean up automatically',c:'meh',m:'Automation is good, but admin rights break least privilege. Give it only the stop permission it needs, and ask first.'}
];
var label={good:'Nice work.',meh:'Almost.',bad:'Careful.'};
$('#choices').innerHTML=opts.map(function(o,i){return '<button type="button" data-i="'+i+'">'+o.t+'</button>'}).join('');
$('#choices').addEventListener('click',function(e){
  var b=e.target.closest('button');if(!b)return;
  var o=opts[+b.dataset.i];
  [].forEach.call(document.querySelectorAll('#choices button'),function(x){x.disabled=true});
  b.classList.add('picked');
  $('#fb').innerHTML='<span class="'+o.c+'">'+label[o.c]+'</span> '+o.m;
  $('#again').hidden=false;
});
$('#again').addEventListener('click',function(){
  [].forEach.call(document.querySelectorAll('#choices button'),function(x){x.disabled=false;x.classList.remove('picked')});
  $('#fb').textContent='';this.hidden=true;
});

/* Project notebooks */
var books=[
 {n:'NekoMemo',s:'Live',c:'live',p:'I forget what I study.',i:'One friendly place for topics, flashcards, recall practice, quizzes and daily reminders. Learn smarter, remember longer.',t:'Web app (HTML, CSS, JavaScript)',l:'Starting small and building around a real habit.',a:'<a href="https://nekomemo.netlify.app/" rel="noopener">Open NekoMemo</a>'},
 {n:'AWS Cost Guardian',s:'Concept / in development',c:'concept',p:'Unexpected AWS charges from forgotten resources.',i:'A proposed cost-awareness tool to identify potentially idle resources, surface cost signals and notify the owner. Any stop action should require explicit approval and narrowly scoped permissions; deletion is out of scope by default.',t:'AWS, IAM, cost monitoring (planned)',l:'Designing for least privilege, clear alerts and human approval. This is a concept, not a deployed monitoring service.',a:'Not released yet'},
 {n:'Farmora',s:'Project showcase',c:'concept',p:'Crop disease symptoms can be difficult to identify quickly.',i:'A farmer uploads a crop photo. Farmora analyses the image for a possible disease and presents suggested solutions or next steps. The output should be treated as decision support—not a guaranteed diagnosis—and checked with local agricultural experts.',t:'Image analysis / AI-assisted workflow (implementation details to be added)',l:'Designing around a practical agricultural problem. Add the model, dataset, evaluation results and demo link here when verified.',a:'Demo and repository links to be added'},
 {n:'S3 static website hosting',s:'Hands-on lab',c:'lab-s',p:'Hosting felt abstract.',i:'Publish a static site straight from an S3 bucket.',t:'Amazon S3, HTML',l:'Object storage and website configuration basics.',a:'<a href="https://github.com/bhargavi267" target="_blank" rel="noopener noreferrer">GitHub profile (project repository to be linked)</a>'},
 {n:'Lambda + S3 + SNS automation',s:'Hands-on lab',c:'lab-s',p:'Doing cloud tasks by hand is slow.',i:'Explore event-driven workflows that connect S3 events, Lambda processing and SNS notifications. EC2 operations are learning exercises, not an always-on production automation.',t:'Python, boto3, Lambda, S3, SNS',l:'How services trigger each other and how permissions shape a safe workflow.',a:'<a href="https://github.com/bhargavi267" target="_blank" rel="noopener noreferrer">GitHub profile (project repository to be linked)</a>'}
];
$('#books').innerHTML=books.map(function(b,i){
 return '<details'+(i===0?' open':'')+'><summary>'+b.n+'<span class="stamp '+b.c+'">'+b.s+'</span></summary><dl><dt>Problem</dt><dd>'+b.p+'</dd><dt>Idea</dt><dd>'+b.i+'</dd><dt>Built with</dt><dd>'+b.t+'</dd><dt>Learned</dt><dd>'+b.l+'</dd><dt>See it</dt><dd>'+b.a+'</dd></dl></details>';
}).join('');
})();
