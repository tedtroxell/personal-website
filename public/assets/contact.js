(() => {
 const form=document.querySelector('[data-contact]'),config=window.TT_LEADS;
 if(!form||!config)return;
 const fieldset=form.querySelector('[data-contact-fields]');
 const button=form.querySelector('[data-submit]'),status=form.querySelector('[data-form-status]');
 let pending=false,requestId='',fingerprint='',nonce=config.nonce;
 const newId=()=>globalThis.crypto?.randomUUID?.()||`${Date.now()}-${Math.random().toString(36).slice(2)}-${Math.random().toString(36).slice(2)}`;
 function announce(text,focus=false){status.textContent=text;if(focus)status.focus();}
 async function request(url,options={}){
   const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),15000);
   try{const response=await fetch(url,{...options,signal:controller.signal,credentials:'omit',cache:'no-store'});let data;try{data=await response.json()}catch{throw new Error('The server response was interrupted. Your draft is preserved; please retry.');}return {response,data};}finally{clearTimeout(timer)}
 }
 form.addEventListener('submit',async(event)=>{
   event.preventDefault();if(pending||!form.reportValidity())return;
   const fields=Object.fromEntries(new FormData(form)),current=JSON.stringify(fields);
   const submittedInDialog=form.closest('dialog');
   if(current!==fingerprint){fingerprint=current;requestId=newId();}
   pending=true;fieldset.disabled=true;button.disabled=true;announce('Saving your message…');
   try{
     let result;
     for(let attempt=0;attempt<2;attempt++){
       result=await request(config.url,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...fields,nonce,request_id:requestId})});
       if(result.data.code==='tt_expired'&&attempt===0){const refresh=await request(config.nonceUrl);if(!refresh.response.ok||typeof refresh.data.nonce!=='string')throw new Error('Could not refresh the form. Your draft is preserved; please retry.');nonce=refresh.data.nonce;continue;}break;
     }
     if(!result.response.ok||!result.data.ok)throw new Error(result.data.message||'Your message did not save. Please try again.');
     form.reset();fingerprint='';requestId='';announce('Thank you. Your message has been saved. I’ll be in touch.',!submittedInDialog || submittedInDialog.open);
   }catch(error){announce(error.name==='AbortError'?'The connection timed out. Your draft is preserved; retrying will not duplicate a saved message.':error.message,!submittedInDialog || submittedInDialog.open)}finally{pending=false;fieldset.disabled=false;button.disabled=false;}
 });
 form.hidden=false;fieldset.disabled=false;button.disabled=false;button.hidden=false;announce('');
})();
