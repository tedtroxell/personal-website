import { paperNotes } from './paper-notes';
import type { PaperKind } from './paper-models';
import { chatUiNote } from './chat-ui-note';
import { oodNote } from './ood-note';
export type NoteKind = 'workflow' | 'measurement' | 'inspection' | 'ood' | 'chat' | 'paper';
export type NoteSection = { title: string; paragraphs: string[]; equation?: string; takeaway?: string; code?: {label:string;source:string} };
export type FieldNote = { kind: NoteKind; paper?: {kind:PaperKind;number:string;title:string;authors:string;released:string;status:string;url:string}; slug: string; title: string; deck: string; category: string; readTime: string; sections: NoteSection[]; modelTitle: string; modelIntro: string; assumptions: string; sources: {label:string;url:string;note:string}[] };
export const fieldNotes: FieldNote[] = [
...paperNotes,
chatUiNote,
oodNote,
{
 kind:'workflow',slug:'where-the-work-waits',title:'Where the work waits',category:'Technical leadership',readTime:'7 MIN READ',
 deck:'A team can be busy all week and still struggle to finish anything. Follow the waiting before adding more work.',
 sections:[
 {title:'Everyone is working. Why is nothing finished?',paragraphs:[
 'Picture a small engineering team with a full board. Design is moving. Review is backed up. Testing keeps starting and stopping. Every person can point to something useful they did today, but the delivery date keeps moving.',
 'The easy response is to ask everyone to go faster. Sometimes a task really does need more help. But a project spends time between tasks too: waiting for a decision, an environment, a reviewer, or someone who knows which version is current. Those gaps rarely appear in a progress update.',
 'Before changing the team, I want to see the route the work actually takes. When did the request arrive? When did anyone start it? When did it become ready for the next person? When did the next person pick it up? A handful of timestamps can make the conversation much more useful.'
 ]},
 {title:'Draw the queue, not just the tasks.',paragraphs:[
 'The example here sends twelve requests through design, review, test and release. One request arrives each working day. Design takes two days, review four, testing three and release one. Each handoff adds a day. There are two design slots, one review slot, two test slots and one release slot. These are invented numbers, chosen so the constraint is visible.',
 'Two designers can produce about one design a day under these assumptions. One reviewer taking four days per item can handle only a quarter of an item a day. A queue is the predictable result. Making design twice as fast would give that reviewer a larger pile to work through.',
 'A Gantt chart becomes more useful when it shows the empty space as well as the colored bars. The pale connectors in this drawing include queue time and the explicit handoff delay. That is where a discussion about delivery should start.'
 ],takeaway:'A faster upstream task can produce a bigger downstream queue.'},
 {title:'Less work in flight is a choice about where to wait.',paragraphs:[
 'A limit on work in progress controls how many requests enter the active workflow. Lower it in the model and the active work becomes easier to follow. Look carefully at the intake queue, though. Requests outside the limit are still waiting. They have not disappeared just because the team has not started them.',
 'The model reports both arrival-to-delivery lead time and admission-to-delivery cycle time. Improving the second while ignoring the first can make a dashboard look better without helping the person who made the request. A limit that is too low can also leave downstream capacity idle.',
 'Little’s law connects average work in a system, its throughput and time in that system. The boundary and time window must be consistent. It is an accounting relationship under its applicable conditions, not a promise that cutting a WIP limit will automatically raise throughput. This finite twelve-item example has startup and shutdown effects, so I do not use its totals as a steady-state proof.'
 ],equation:'Average work in system = throughput × average time in system'},
 {title:'Change one constraint and watch where it moves.',paragraphs:[
 'Try adding a review slot. Then try shortening review time. Those changes address the constrained stage in this example, but they mean different things in a real team. A second reviewer needs the right context and authority. Shorter reviews might come from smaller changes, clearer acceptance criteria or a prepared test result. Simply asking for less scrutiny would be a different experiment.',
 'Now remove some handoff delay. That could represent an agreed owner, an available test environment or a decision that no longer needs a weekly meeting. Notice which metric changes. Faster completion, less waiting inside the process and less waiting at intake are related, but they are not interchangeable.',
 'Once review improves, testing can become the next constraint. That is a useful result. The team has changed the system enough for a different limitation to matter. Keep measuring instead of turning the first fix into a permanent slogan.'
 ]},
 {title:'The leadership work is in the handoff.',paragraphs:[
 'I would start with a recent set of completed requests and reconstruct their timelines. Then I would ask the people doing the work what caused the longest waits. A queue might reflect scarce expertise. It might also reflect an unclear decision, incomplete input or several teams protecting different priorities.',
 'Choose one change, name an owner and agree on what improvement would count. Track delivery time from the original request, throughput over a useful window, rework and the age of unfinished requests. A quicker process that pushes defects into the next stage has not solved the whole problem.',
 'The simulator leaves out interruptions, variable task sizes, absences, rework and priority changes. Real work includes all of those. Use the drawing to form a better question, then use the actual workflow to answer it. The point is to make a team’s effort turn into finished work more reliably.'
 ],takeaway:'Measure the whole request, including the time before anyone starts it.'}
 ],
 modelTitle:'Find the next useful change.',modelIntro:'Change review capacity, review duration, WIP and handoff delay. Compare the full request time with time inside the active process.',
 assumptions:'Deterministic twelve-request example. One request arrives per day. Tasks are non-preemptive and take whole or quarter days; queues are first-ready, first-served. The WIP limit includes work waiting at handoffs. People are represented as independent stage slots, with no sharing, absences or rework. All times are working days.',
 sources:[{label:'John D. C. Little, A proof for the queuing formula L = λW (1961)',url:'https://fisherp.scripts.mit.edu/wordpress/wp-content/uploads/2015/11/ContentServer.pdf',note:'The original result behind the average inventory, throughput and time relationship.'}]
},
{
 kind:'measurement',slug:'how-good-is-the-measurement',title:'How good is the measurement?',category:'Engineering',readTime:'7 MIN READ',
 deck:'Before we argue about the model, we should check the instrument. A precise-looking number can still lead to the wrong call.',
 sections:[
 {title:'The part has not changed. The answer has.',paragraphs:[
 'A part is close to its upper size limit. One reading says it passes. The next says it fails. Before debating the machining process or retraining an inspection model, there is a simpler question: how much of that disagreement comes from the measurement?',
 'In this example, a dimension has a nominal value of 75.00 mm and a specification of plus or minus 0.10 mm. The part, instrument and observations are synthetic. We know the part’s reference dimension because we created the example. A real inspection rarely offers that convenience.',
 'The drawing separates three things that are often mixed together: the dimension we want to know, the reading an instrument produces and the rule used to accept the part. Keeping those separate makes it easier to see which change would actually improve the decision.'
 ]},
 {title:'A repeatable wrong answer is still wrong.',paragraphs:[
 'Random variation makes readings spread out. Bias moves their average relative to a reference. A gauge can give tightly grouped readings and still sit consistently high. It can also have little average bias while individual readings vary too much for a useful acceptance decision.',
 'The controls separate those effects. Increase the bias and the measurement distribution shifts sideways. Increase the reading noise and it spreads out. The specification limits stay fixed because they describe the part requirement, not the instrument’s behavior.',
 'A measurement study should also ask what happens across operators, fixtures, instruments and days. Repeating the same setup ten times tells us about one kind of variation. It does not automatically describe what will happen when another person uses a different fixture on the next shift. NIST’s measurement guidance treats repeatability, reproducibility, stability and bias as distinct questions.'
 ],equation:'Reading = reference dimension + bias + random error'},
 {title:'More readings help with one problem.',paragraphs:[
 'If reading errors are independent, have zero mean and come from a stable process with standard deviation σ, the standard deviation of their average is σ divided by the square root of the number of readings. Four readings halve that random component. Sixteen reduce it to a quarter. There is a diminishing return.',
 'That calculation does not remove bias. Nor does it justify treating strongly correlated readings as independent information. If the fixture warms up between observations or the same alignment error affects every reading, taking more measurements may leave the important uncertainty untouched.',
 'The shaded curve here is the assumed distribution of the average reading. The marker at its center is an expected value under the model, not a new observation from a physical gauge. Its interval shows plus or minus two standard errors under a normal-error assumption. That is roughly 95% coverage for this random component; it is not a complete uncertainty statement.'
 ],equation:'Standard deviation of the average = σ / √n',takeaway:'Averaging reduces independent random variation. It does not cancel a fixed offset.'},
 {title:'Calibration is a measurement too.',paragraphs:[
 'Compare the instrument with a suitable reference, estimate its bias and decide how to correct or account for that bias. The reference has uncertainty, the procedure has limits and the instrument can change afterward. A correction is useful, but it is not a certificate that every future reading is exact.',
 'The calibration switch makes a deliberately generous assumption: it knows the simulated bias and removes it perfectly. That helps isolate the effect of an offset. A real uncertainty budget must carry the uncertainty of that correction, along with other relevant contributions such as resolution, temperature, alignment and reproducibility.',
 'Now move the reference dimension close to a limit. Even a centered instrument can produce readings on both sides. An acceptance rule may need an uncertainty-aware margin or an additional check. Choosing that rule requires agreement about the consequences of accepting a bad part and rejecting a good one. A drawing tolerance alone does not settle that tradeoff.'
 ]},
 {title:'The same problem turns up in the training data.',paragraphs:[
 'Suppose those readings become pass/fail labels for a machine-learning model. Near the limit, some labels now describe the behavior of the measurement system as much as the condition of the part. A model can learn that pattern quite faithfully. Better optimization will not tell it which labels came from a biased gauge.',
 'I would investigate disagreement near the boundary, repeat a subset of measurements under controlled conditions and compare against a better-characterized reference where practical. Keep the raw readings and the conditions, rather than retaining only the final label. That makes it possible to revisit a decision without pretending the original observation was perfect.',
 'The batch output below averages expected decisions over 301 evenly spaced reference dimensions from 74.85 to 75.15 mm. That artificial mix deliberately includes many borderline parts. Its error totals do not estimate a factory’s scrap rate. They show why improving the measurement can be a more useful next step than changing the model.'
 ],takeaway:'Check how the label was made before asking a model to reproduce it.'}
 ],
 modelTitle:'Move the instrument, not the tolerance.',modelIntro:'Adjust bias, reading noise and the number of independent readings. Move the selected reference part across the specification boundary.',
 assumptions:'Known synthetic reference dimensions; additive, normally distributed, independent errors with constant standard deviation. Averaging is applied separately to each part. Perfect bias correction is an illustrative upper bound. Expected batch errors are calculated analytically for 301 equally weighted dimensions, not sampled observations or a production forecast. Other uncertainty sources are excluded.',
 sources:[{label:'NIST: Measurement process characterization',url:'https://www.nist.gov/publications/nistsematech-engineering-statistics-handbook-chapter-2-measurement-process',note:'A framework for studying calibration, repeatability, reproducibility, stability and uncertainty.'},{label:'NIST Technical Note 1297: Terminology',url:'https://www.nist.gov/pml/nist-technical-note-1297/nist-tn-1297-appendix-d1-terminology',note:'Why measurement uncertainty needs more than a repeatability number.'}]
},
{
 kind:'inspection',slug:'when-the-model-should-ask-for-help',title:'When the model should ask for help',category:'Machine learning',readTime:'8 MIN READ',
 deck:'Sometimes the most useful answer is: someone needs to look at this. Designing that handoff is part of building the model.',
 sections:[
 {title:'A score is not a decision.',paragraphs:[
 'Imagine an inspection model that assigns each part a defect score. High scores look suspicious. Low scores look acceptable. Somewhere between the two, a team has to draw a line. The line is a decision about consequences, even if it arrives in the software as a default value of 0.5.',
 'A missed defect might lead to a return or a failed assembly. Rejecting a good part wastes material and capacity. Sending it to a person takes time. There is no single threshold that tells us how those costs should be balanced without knowing what happens after inspection.',
 'The example uses 240 synthetic parts, including 30 defects. You can change the threshold, reserve an interval for review and limit the number of reviews available for the batch. Nothing here is measured factory performance. The point is to make the operating policy visible.'
 ]},
 {title:'Start with what each mistake costs.',paragraphs:[
 'For a fixed test set, count missed defects and good parts rejected at each threshold. Then connect those counts to the relevant consequences. An overall accuracy number hides that distinction. A threshold that avoids most rejection can still pass the defects the inspection was meant to catch.',
 'Here a rejected good part costs 40 illustrative units, a review costs five and a held part incurs ten units of handling cost for the batch. The missed-defect cost is adjustable. These are scenario inputs, not estimates from an actual operation. Hold costs also leave out any unresolved downstream risk.',
 'If the score were a well-calibrated defect probability p, and the only choices were accept or reject, accepting would have expected cost p times the cost of a miss. Rejecting would cost one minus p times the cost of scrapping a good part. Those assumptions lead to the threshold below. The demo’s score is not calibrated, so it evaluates its actual synthetic outcomes instead of applying that formula as a probability rule.'
 ],equation:'Reject when p > scrap cost / (miss cost + scrap cost)'},
 {title:'Give the uncertain cases somewhere to go.',paragraphs:[
 'A review band creates a third route. Scores below the band are accepted automatically; scores above it are rejected. Cases inside it are offered to a reviewer. That can reduce automatic mistakes, but it creates a queue that needs an owner, capacity and a response time.',
 'Widen the band and watch the review demand. Once capacity is exhausted, this model holds the remaining cases. It does not quietly accept them. That behavior matters. A policy that appears safe only because it leaves a growing pile unresolved is not ready to operate at that arrival rate.',
 'People make mistakes too. The reviewer-accuracy setting is an explicit simplifying assumption: the same independent correctness rate for every reviewed case, including the difficult ones. Real review should be evaluated on the cases it actually receives. In practice, those are often a more demanding set than a random sample.'
 ],takeaway:'Review is a workflow with its own failure modes and capacity limit.'},
 {title:'Confidence needs a reference point.',paragraphs:[
 'A displayed score of 0.9 is not automatically a nine-in-ten chance of a defect. Calibration asks whether reported probabilities agree with observed frequencies across suitable groups of predictions. Good ranking and good calibration are different properties. A model can order parts usefully while giving probabilities that are too confident.',
 'Guo and colleagues demonstrated calibration problems in modern neural networks and studied post-processing methods such as temperature scaling. That is a useful reason to check probability claims, not a reason to assume one adjustment will fix every model. Calibration needs independent data that represents the setting in which the scores will be used.',
 'If a policy relies on probability, evaluate calibration as well as discrimination. Look across relevant defect types, instruments and operating conditions, and keep enough examples to see uncertainty in the estimates. A small bin with no observed misses does not establish that the miss rate is zero.'
 ]},
 {title:'The world can move while the threshold stays still.',paragraphs:[
 'Switch on changed conditions in the model. It moves good-part scores upward and defect scores downward, producing more overlap while keeping the same 30 defects in the batch. This is a deliberately simple stress test. It is not a simulation of a specific camera, material or failure mechanism.',
 'An unfamiliar input does not have to receive a cautious score. A model can be confidently wrong outside the conditions it was evaluated on. A review band based only on the score will not catch every such case. Monitoring input changes, checking labels and maintaining separate rules for known operating limits can all matter.',
 'The NIST AI RMF Playbook treats monitoring, human roles and responses to changing performance as ongoing work. For an inspection system, I would name who can pause automatic decisions, what evidence triggers that pause and how held work is cleared. “A person can override it” is not enough if nobody owns the queue.'
 ]},
 {title:'Decide what earns the right to run automatically.',paragraphs:[
 'Start with a defined decision and a representative held-out set. Agree on the consequences of each outcome, the review capacity and what happens when the system cannot complete a decision. Compare policies on the same cases, then check them in the operating conditions that matter.',
 'The outputs below include expected reviewer mistakes, so some totals are fractional. They also show held work separately. That keeps a cheap-looking partial result from being mistaken for a completed inspection batch. Reveal the reference labels to see which regions contain the errors.',
 'A useful model does not need to make every call. It needs a clear boundary around the calls it can support, a workable handoff for the others and evidence that those boundaries still make sense. That is part of the engineering, and it stays part of the leadership work after launch.'
 ],takeaway:'Agree on the fallback before asking the system to make the first automatic decision.'}
 ],
 modelTitle:'Design the handoff.',modelIntro:'Set the threshold and review band, then give the review queue a realistic capacity. Compare the same synthetic batch under changed conditions.',
 assumptions:'Fixed seeded sample of 240 cases with 30 defects. Scores are synthetic ranking scores, not calibrated probabilities. Changed conditions shift the class score distributions without changing prevalence. Review is first-arrived, first-served; unreviewed cases are held. Reviewer correctness is independent and constant. Cost includes expected missed defects, good parts rejected, completed reviews and a per-batch holding charge; no safety, delay or lifetime-cost claim is made.',
 sources:[{label:'Guo et al.: On calibration of modern neural networks (2017)',url:'https://proceedings.mlr.press/v70/guo17a',note:'Evidence that classification performance and confidence calibration need separate evaluation.'},{label:'NIST AI RMF Playbook: Manage',url:'https://airc.nist.gov/airmf-resources/playbook/manage/',note:'Monitoring changing behavior and managing the human and organizational response.'}]
}
];
export function getFieldNote(slug: string) { return fieldNotes.find(note=>note.slug===slug); }
