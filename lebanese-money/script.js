'use strict';
const bdl='https://www.bdl.gov.lb/';
const noteBase=bdl+'CB%20Com/Banknotes%20%26%20Coins/Lebanese%20BankNotes/Banknotes/';
const history=bdl+'modernized-bdltimeline.php';
const imf1989='https://www.elibrary.imf.org/view/journals/024/1989/003/article-A007-en.xml';
const imf2019='https://www.elibrary.imf.org/view/journals/002/2019/312/article-A002-en.xml';
const imf2023='https://www.elibrary.imf.org/view/journals/002/2023/237/article-A001-en.xml';
const bakery='https://today.lorientlejour.com/article/1326026/why-is-the-manoushe-so-expensive.html';
const eras=[{"year": "1970s", "label": "Before & during the war", "range": "PART 01 / A WALLET FROM ANOTHER TIME", "title": "Lira, before all the zeros.", "text": "The early 1970s came before the civil war, which began in 1975. BDL issued denominations such as 1, 5, 10, 25, 50 and 100 lira in this decade. Examine these actual 1974 notes and imagine the wallet they belonged to.", "lesson": "A smaller face value does not tell us how little or how much a note could buy.", "detail": "One lira is divided into 100 piastres. The pictured 25- and 50-lira notes are 1974 issues. Prices changed within the decade, especially as war began: there is no single “1970s price.” The 250-lira denomination first appeared in 1978.", "source": "https://www.bdl.gov.lb/listofissuances.php", "notes": [{"value": 25, "img": "https://upload.wikimedia.org/wikipedia/commons/e/e7/25-Livres-Lebanon-1974.jpg", "caption": "25 livres · 1974 issue · Banque du Liban / BANK NOTE MUSEUM via Wikimedia Commons", "imageSource": "https://commons.wikimedia.org/wiki/File:25-Livres-Lebanon-1974.jpg"}, {"value": 50, "img": "https://upload.wikimedia.org/wikipedia/commons/9/92/50-Livres-Lebanon-1974.jpg", "caption": "50 livres · 1974 issue · Banque du Liban / BANK NOTE MUSEUM via Wikimedia Commons", "imageSource": "https://commons.wikimedia.org/wiki/File:50-Livres-Lebanon-1974.jpg"}]}, {"year": "2020s", "label": "After the war · the recent crisis", "range": "PART 02 / THE CRISIS-Era WALLET", "title": "Big numbers. Everyday choices.", "text": "Decades after the civil war ended in 1990, the financial crisis that began in 2019 changed everyday transactions. Notes in the thousands became familiar, but their printed numbers did not protect purchasing power.", "lesson": "Compare the cost of goods with income: counting zeros alone cannot measure living standards.", "detail": "The food examples use January 2023, not today: a Beirut zaatar manoushe was reported at LL30,000–50,000. The gallery shows real banknote scans from BDL and Numista. A note used in a decade may have been issued earlier.", "source": "https://www.elibrary.imf.org/view/journals/002/2023/237/article-A001-en.xml", "notes": [{"value": 1000, "img": "https://www.bdl.gov.lb/CB%20Com/Banknotes%20%26%20Coins/Lebanese%20BankNotes/Banknotes/1000LBP_B_2008_R.jpg", "caption": "1,000 livres · 2008 specimen · Banque du Liban", "imageSource": "https://www.bdl.gov.lb/CB%20Com/Banknotes%20%26%20Coins/Lebanese%20BankNotes/Banknotes/1000LBP_B_2008_R.jpg"}, {"value": 5000, "img": "https://en.numista.com/catalogue/photos/liban/6450aa5c5969b8.92074696-original.jpg", "caption": "5,000 livres · modern series; see source for issue details · photo © hex7ech / Numista · CC BY-NC 4.0", "imageSource": "https://en.numista.com/211292"}, {"value": 10000, "img": "https://en.numista.com/catalogue/photos/liban/644fffd884dfd3.00089957-original.jpg", "caption": "10,000 livres · modern series; see source for issue details · photo © hex7ech / Numista · CC BY-NC 4.0", "imageSource": "https://en.numista.com/216093"}, {"value": 20000, "img": "https://en.numista.com/catalogue/photos/liban/6450abf054b461.43796961-original.jpg", "caption": "20,000 livres · modern series; see source for issue details · photo © hex7ech / Numista · CC BY-NC 4.0", "imageSource": "https://en.numista.com/210490"}, {"value": 50000, "img": "https://en.numista.com/catalogue/photos/liban/64500787b88560.10183199-original.jpg", "caption": "50,000 livres · modern series; see source for issue details · photo © hex7ech / Numista · CC BY-NC 4.0", "imageSource": "https://en.numista.com/216103"}, {"value": 100000, "img": "https://en.numista.com/catalogue/photos/liban/65a6c628bec293.56046840-original.jpg", "caption": "100,000 livres · 2023 type · photo © hex7ech / Numista · CC BY-NC 4.0", "imageSource": "https://en.numista.com/395599"}]}];
const $=id=>document.getElementById(id);
const format=value=>Number(value).toLocaleString('en-US');
let selected=0;
let selectedNote=0;
function assetURL(url){return (window.LOCAL_ASSETS||{})[url]||url;}
function safeImage(img,url){img.hidden=false;img.dataset.remote=url;img.dataset.fallback='0';img.src=assetURL(url);}
function handleImageError(event){const img=event.currentTarget;if(img.dataset.remote&&img.src!==img.dataset.remote&&img.dataset.fallback!=='1'){img.dataset.fallback='1';img.src=img.dataset.remote;return;}img.hidden=true;if(img.id==='note-image')$('image-error').hidden=false;}
document.querySelectorAll('img').forEach(img=>img.addEventListener('error',handleImageError));
const timeline=$('timeline');
eras.forEach((era,index)=>{const button=document.createElement('button');button.type='button';button.innerHTML='<strong>'+era.year+'</strong><small>'+era.label+'</small>';button.setAttribute('aria-pressed','false');button.addEventListener('click',()=>renderEra(index));timeline.append(button);});
function currentNote(){return eras[selected].notes[selectedNote];}
function renderNote(index){
 selectedNote=index; const note=currentNote();
 [...$('denominations').children].forEach((button,i)=>button.setAttribute('aria-pressed',String(i===index)));
 $('note-caption').textContent=note.caption;$('image-source').href=note.imageSource;$('image-error').hidden=true;$('note-image').alt=note.caption;safeImage($('note-image'),note.img);
 $('bubble-kind').textContent=selected===0?'Denomination detective · not a retail price':'Calculated example · January 2023';
 $('bubble-title').textContent=selected===0?'“'+format(note.value)+' lira = '+format(note.value*100)+' piastres.”':'“What can LL'+format(note.value)+' buy?”';
 const count=Math.floor(note.value/40000),change=note.value%40000;
 $('bubble-text').textContent=selected===0?'This is the same amount expressed in two units, not extra wealth. '+(note.value===25?'Two of these 25-lira notes equal one 50-lira note.':'This 50-lira note equals two 25-lira notes.')+' What could it buy? A reliable, dated local price is needed before we can answer.':(count?'At LL40,000 each, this note buys '+count+' whole zaatar manoushe'+(count>1?'s':'')+' with LL'+format(change)+' left.':'At LL40,000 each, this note alone does not cover one zaatar manoushe. You need LL'+format(40000-note.value)+' more.')+' This uses the midpoint of a reported January 2023 Beirut range, not a current or national price.';
 $('bubble-content').hidden=true;$('bubble-toggle').setAttribute('aria-expanded','false');$('bubble-hint').textContent='Reveal the story +';
}
function renderEra(index){
 selected=Math.max(0,Math.min(eras.length-1,index));const era=eras[selected];
 [...timeline.children].forEach((button,i)=>button.setAttribute('aria-pressed',String(i===selected)));
 $('artifact-number').textContent='WALLET / 0'+(selected+1);$('era-range').textContent=era.range;$('era-kicker').textContent=era.year+' / '+era.label;$('era-title').textContent=era.title;$('era-text').textContent=era.text;$('era-lesson').textContent=era.lesson;$('era-detail').textContent=era.detail;$('era-source').href=era.source;
 $('denominations').replaceChildren();era.notes.forEach((note,i)=>{const button=document.createElement('button');button.className='denomination';button.type='button';button.setAttribute('aria-pressed','false');const img=document.createElement('img');img.alt='';img.addEventListener('error',handleImageError);safeImage(img,note.img);const span=document.createElement('span');span.textContent=format(note.value)+' LBP';button.append(img,span);button.addEventListener('click',()=>renderNote(i));$('denominations').append(button);});
 renderNote(0);$('context').open=false;$('prev').disabled=selected===0;$('next').disabled=selected===eras.length-1;$('chapter-count').textContent=(selected+1)+' / '+eras.length;
}
$('prev').addEventListener('click',()=>renderEra(selected-1));$('next').addEventListener('click',()=>renderEra(selected+1));
$('bubble-toggle').addEventListener('click',()=>{const open=$('bubble-toggle').getAttribute('aria-expanded')==='true';$('bubble-toggle').setAttribute('aria-expanded',String(!open));$('bubble-content').hidden=open;$('bubble-hint').textContent=open?'Open story +':'Hide story −';});
$('note-open').addEventListener('click',()=>{const note=currentNote();$('lightbox-title').textContent=format(note.value)+' LBP · Banknote detail';$('large-note').alt=note.caption;safeImage($('large-note'),note.img);$('large-caption').textContent=note.caption;$('large-source').href=note.imageSource;$('lightbox').showModal();});
$('close-lightbox').addEventListener('click',()=>$('lightbox').close());
$('lightbox').addEventListener('click',e=>{if(e.target===$('lightbox')){const r=$('lightbox').getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)$('lightbox').close();}});
function calculateBasket(budget,price){return{count:Math.floor(budget/price),change:budget%price};}
function updateBasket(){const budget=Number($('budget').value);[['before',1000],['after',40000]].forEach(([prefix,price])=>{const result=calculateBasket(budget,price);$(prefix+'-count').textContent=format(result.count);$(prefix+'-change').textContent='LL'+format(result.change)+' left from your LL'+format(budget)+' budget.';$(prefix+'-food').textContent=result.count?'🫓'.repeat(Math.min(result.count,8))+(result.count>8?' + '+(result.count-8):''):'—';});}
$('budget').addEventListener('change',updateBasket);
function setPresentation(on){document.body.classList.toggle('presentation',on);$('present').setAttribute('aria-pressed',String(on));$('present').textContent=on?'Exit presentation ×':'Present ↗';if(on){renderEra(0);window.scrollTo({top:0,behavior:'instant'});}else $('exhibit').scrollIntoView({behavior:'instant'});}
$('present').addEventListener('click',()=>setPresentation(!document.body.classList.contains('presentation')));
document.addEventListener('keydown',event=>{if(!document.body.classList.contains('presentation')||$('lightbox').open||/INPUT|SELECT|TEXTAREA/.test(event.target.tagName))return;if(event.key==='ArrowRight'){event.preventDefault();renderEra(selected+1);}if(event.key==='ArrowLeft'){event.preventDefault();renderEra(selected-1);}if(event.key==='Escape')setPresentation(false);});
renderEra(selected);updateBasket();

// Classroom activities: all state remains in this browser tab.
let wallet=[];
function updateWallet(){
 $('wallet-total').textContent='LL'+format(wallet.reduce((sum,value)=>sum+value,0));
 $('undo-note').disabled=wallet.length===0;
 $('payment-feedback').textContent='Banknotes selected: '+(wallet.length?wallet.map(value=>'LL'+format(value)).join(' + '):'none')+'.';
}
[5000,10000,20000,50000,100000].forEach(value=>{
 const button=document.createElement('button');button.className='outline';button.type='button';button.textContent='+ '+format(value)+' LBP';
 button.addEventListener('click',()=>{if(wallet.length>=20){$('payment-feedback').textContent='Your wallet holds 20 notes. Undo a note or start again.';return;}wallet.push(value);updateWallet();});$('wallet-notes').append(button);
});
$('pay').addEventListener('click',()=>{
 const total=wallet.reduce((sum,value)=>sum+value,0),cost=80000;
 $('payment-feedback').textContent=total<cost?'Not enough yet. Add LL'+format(cost-total)+' to cover both breakfasts.':total===cost?'Exactly right! LL80,000 buys two breakfasts in this January 2023 example. No change needed.':'Payment accepted! Two breakfasts and LL'+format(total-cost)+' change. A larger payment does not change the price.';
});
$('undo-note').addEventListener('click',()=>{wallet.pop();updateWallet();});
$('reset-wallet').addEventListener('click',()=>{wallet=[];updateWallet();});updateWallet();
const questions=[
 {title:'The year is 1974. Has the Lebanese Civil War started?',options:['Yes, it is already over.','No, it begins in 1975.','Yes, it began in 1964.'],answer:1,explanation:'The civil war lasted from 1975 to 1990. Our 1974 banknotes belong to the pre-war years.'},
 {title:'Two 25-lira notes equal how many 50-lira notes?',options:['One','Two','Four'],answer:0,explanation:'2 × 25 = 50. Changing the number of notes does not change the total value.'},
 {title:'At LL40,000 each, how many whole manaeesh can LL100,000 buy?',options:['One','Two, with LL20,000 left','Three'],answer:1,explanation:'2 × 40,000 = 80,000, leaving LL20,000. This is the selected January 2023 example, not today’s price.'},
 {title:'Does a larger number on a banknote mean you can buy more than in the 1970s?',options:['Always: more zeros means more wealth.','No comparison is ever possible.','We need prices and dates to compare.'],answer:2,explanation:'Face value is the printed number. Purchasing power depends on prices. To compare living standards, also consider income and the date.'}
];
let questionIndex=0,score=0,answered=false;
function showQuestion(){
 answered=false;const question=questions[questionIndex];$('question-progress').textContent='Question '+(questionIndex+1)+' of '+questions.length;
 $('question-title').textContent=question.title;$('answer-feedback').textContent='Choose an answer to reveal the explanation.';$('next-question').disabled=true;$('next-question').textContent=questionIndex===questions.length-1?'See my result →':'Next question →';$('answer-options').replaceChildren();
 question.options.forEach((option,index)=>{const button=document.createElement('button');button.type='button';button.className='answer';button.textContent=option;button.addEventListener('click',()=>{
 if(answered)return;answered=true;const correct=index===question.answer;if(correct)score++;
 [...$('answer-options').children].forEach((b,i)=>{b.disabled=true;if(i===question.answer)b.classList.add('correct');else if(i===index)b.classList.add('incorrect');});
 $('answer-feedback').textContent=(correct?'Correct! ':'Not quite. ')+question.explanation;$('next-question').disabled=false;$('quiz-score').textContent='Score: '+score+' / '+(questionIndex+1)+' answered.';
 });$('answer-options').append(button);});
}
$('next-question').addEventListener('click',()=>{if(!answered)return;if(questionIndex<questions.length-1){questionIndex++;showQuestion();}else{$('question-title').textContent='Investigation complete: '+score+' / '+questions.length;$('question-progress').textContent='You have finished all four questions.';$('answer-options').replaceChildren();$('answer-feedback').textContent=score===questions.length?'Well done! Now explain the difference between face value and purchasing power to a classmate.':'Review the explanations, explore the notes again, then restart when you are ready.';$('next-question').disabled=true;}$('question-title').focus();});
$('restart-questions').addEventListener('click',()=>{questionIndex=0;score=0;$('quiz-score').textContent='';showQuestion();$('question-title').focus();});showQuestion();
