// Editorial dates for the local article collection. No scheduling or visibility gates.
export const publicationDates:Record<string,string>={
 'where-the-work-waits':'2026-03-11',
 'how-good-is-the-measurement':'2026-04-15',
 'when-the-model-should-ask-for-help':'2026-05-20',
 'paper2agent-executable-research':'2026-09-23',
 'when-the-inputs-change':'2026-07-15',
 'alphagenome-context-and-resolution':'2026-02-18',
 'the-interface-starts-in-chat':'2026-10-14',
 'language-models-over-bytes':'2026-10-28',
 'engram-conditional-memory':'2026-08-19',
 'attention-residuals':'2026-06-17',
 'dinov3-patch-features':'2026-01-14',
};
export function getPublicationDate(slug:string){
 const iso=publicationDates[slug]??'2026-11-01';
 const label=new Intl.DateTimeFormat('en-GB',{day:'numeric',month:'long',year:'numeric',timeZone:'UTC'}).format(new Date(iso+'T00:00:00Z'));
 return {iso,label};
}
