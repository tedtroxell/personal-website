(() => {
  const form=document.querySelector('[data-contact]');
  const dialog=document.querySelector('[data-contact-dialog]');
  const contactUrl=window.TT_LEADS?.contactUrl;
  if (!form || form.hidden || !dialog?.showModal || !contactUrl) return;
  const destination=new URL(contactUrl);
  const slot=dialog.querySelector('[data-contact-modal-body]');
  const title=dialog.querySelector('#contact-dialog-title');
  const inline=!dialog.contains(form), home=form.parentNode;
  const placeholder=inline ? document.createElement('div') : null;
  if (placeholder) {
    placeholder.hidden=true;
    placeholder.setAttribute('aria-hidden','true');
    home.insertBefore(placeholder,form);
  }
  let opener=null,position={top:0,left:0},backdropDown=false;
  function open(link) {
    if (dialog.open) return;
    opener=link;
    position={top:window.scrollY,left:window.scrollX,behavior:'instant'};
    if (!form.querySelector('[data-contact-fields]').disabled && link.textContent.toLowerCase().includes('speak')) form.elements.intent.value='speaking';
    if (placeholder) {
      placeholder.style.height=`${form.getBoundingClientRect().height}px`;
      placeholder.hidden=false;
      slot.append(form);
    }
    document.body.style.setProperty('--contact-scroll-top',`-${position.top}px`);
    document.body.classList.add('contact-modal-open');
    dialog.showModal();
    dialog.scrollTop=0;
    title.focus({preventScroll:true});
  }
  dialog.addEventListener('close',()=>{
    if (placeholder) { home.insertBefore(form,placeholder); placeholder.hidden=true; }
    document.body.classList.remove('contact-modal-open');
    document.body.style.removeProperty('--contact-scroll-top');
    window.scrollTo(position);
    const target=opener?.getClientRects().length ? opener : document.querySelector('.menu-toggle');
    target?.focus({preventScroll:true});
  });
  dialog.querySelector('[data-contact-close]').addEventListener('click',()=>dialog.close());
  const outside=event=>{
    const rect=dialog.getBoundingClientRect();
    return event.target===dialog && (event.clientX<rect.left || event.clientX>rect.right || event.clientY<rect.top || event.clientY>rect.bottom);
  };
  dialog.addEventListener('pointerdown',event=>{backdropDown=outside(event)});
  dialog.addEventListener('click',event=>{if(backdropDown && outside(event)) dialog.close();backdropDown=false;});
  document.querySelectorAll('a[href]').forEach(link=>{
    const url=new URL(link.href,contactUrl);
    if (url.origin!==destination.origin || url.pathname!==destination.pathname || url.search!==destination.search || url.hash!=='#contact' || link.getAttribute('target')==='_blank') return;
    link.setAttribute('aria-haspopup','dialog');
    link.setAttribute('aria-controls',dialog.id);
    link.addEventListener('click',event=>{
      if (event.defaultPrevented || event.button!==0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();open(link);
    });
  });
})();
