import {step,fit} from './model.js?v=055dad93bb5a';
import {draw,equation} from './view.js?v=055dad93bb5a';
export function mountLab(root) {
  const controls=root.querySelector('[data-lab-controls]'), play=root.querySelector('[data-play]'), reset=root.querySelector('[data-reset]'), lengthInput=root.querySelector('[data-length]'), threshold=root.querySelector('[data-threshold]'), status=root.querySelector('[data-lab-status]'), display=root.querySelector('[data-equation]');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let state={angle:-.42,velocity:0}, length=1, running=false, visible=false, frame=0,last=0,samples=[],tick=0,announced=false;
  function render(){draw(root,state,length)}
  function setStatus(text){status.textContent=text}
  function showFit(deliberate=false){
    const result=fit(samples,Number(threshold.value));
    if(!result){display.textContent='Collecting observations…';if(deliberate)setStatus('Run the experiment to collect enough movement for a useful model.');return;}
    display.textContent=equation(result);
    if(deliberate||!announced){setStatus(`${result.termCount} active ${result.termCount===1?'term':'terms'}. Average acceleration error: ${result.error.toFixed(2)} radians per second squared. ${result.termCount===1?'Gravity explains most of the motion. The small damping effect has been left out.':'The model includes smaller effects as well as gravity.'}`);announced=true;}
  }
  function stopFrame(){cancelAnimationFrame(frame);frame=0;last=0}
  function animate(now){
    frame=0;
    if(!running||!visible||document.hidden)return;
    const dt=last?Math.min((now-last)/1000,.032):1/60;last=now;
    const before=state;state=step(state,dt,length);
    if(dt>0){samples.push({angle:before.angle,velocity:before.velocity,acceleration:(state.velocity-before.velocity)/dt});if(samples.length>900)samples.shift();}
    render();if(++tick%30===0)showFit();
    frame=requestAnimationFrame(animate);
  }
  function reconcile(){stopFrame();if(running&&visible&&!document.hidden)frame=requestAnimationFrame(animate)}
  function setRunning(value){running=value;play.textContent=running?'Pause experiment Ⅱ':'Run experiment ▶';play.setAttribute('aria-pressed',String(running));reconcile()}
  function toggle(){setRunning(!running);setStatus(running?'Collecting motion. Try a push or change the length.':'Experiment paused. Your observations are preserved.');}
  function clearSamples(){samples=[];tick=0;announced=false;display.textContent='Run to discover the equation.'}
  function doReset(){setRunning(false);state={angle:-.42,velocity:0};clearSamples();render();setStatus('Experiment reset. Press Run experiment to begin again.');}
  function changeLength(){length=Number(lengthInput.value);root.querySelector('#lab-length-output').textContent=`${length.toFixed(1)} m`;clearSamples();render();setStatus('Length changed. A new model needs fresh observations.');}
  function changeThreshold(){root.querySelector('#lab-threshold-output').textContent=Number(threshold.value).toFixed(2);showFit(true);}
  function push(event){const value=Number(event.currentTarget.dataset.push);state.velocity=Math.max(-5,Math.min(5,state.velocity+value*1.2));render();setStatus(running?'Impulse added. Watch how the motion changes.':'Impulse ready. Press Run experiment to see its effect.');}
  function onMotion(){if(reduced.matches){setRunning(false);setStatus('Reduced motion is enabled. The experiment is paused; you can still choose to run it.');}}
  const pushes=[...root.querySelectorAll('[data-push]')];
  play.addEventListener('click',toggle);reset.addEventListener('click',doReset);lengthInput.addEventListener('input',changeLength);threshold.addEventListener('input',changeThreshold);pushes.forEach(b=>b.addEventListener('click',push));document.addEventListener('visibilitychange',reconcile);reduced.addEventListener('change',onMotion);
  let observer;
  if('IntersectionObserver' in window){observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;reconcile();});observer.observe(root)}else visible=true;
  controls.hidden=false;play.setAttribute('aria-pressed','false');render();setStatus('Ready when you are. Run the experiment, then try changing its length.');
  return ()=>{stopFrame();observer?.disconnect();play.removeEventListener('click',toggle);reset.removeEventListener('click',doReset);lengthInput.removeEventListener('input',changeLength);threshold.removeEventListener('input',changeThreshold);pushes.forEach(b=>b.removeEventListener('click',push));document.removeEventListener('visibilitychange',reconcile);reduced.removeEventListener('change',onMotion)};
}
