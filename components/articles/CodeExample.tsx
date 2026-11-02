import { useState } from 'react';
export function CodeExample({label,source}:{label:string;source:string}) {
 const [status,setStatus]=useState('');
 async function copy(){try{await navigator.clipboard.writeText(source);setStatus('Copied')}catch{setStatus('Select the code to copy')}}
 return <figure className="note-code"><figcaption><span>{label}</span><button type="button" onClick={copy}>Copy code</button></figcaption><pre tabIndex={0} aria-label={label}><code>{source}</code></pre><span className="note-code-status" role="status">{status}</span></figure>;
}
