import type { FieldNote } from './field-notes';
export const paperNotes:FieldNote[] = [
 {
  "kind": "paper",
  "slug": "attention-residuals",
  "title": "Which layers should get a say?",
  "deck": "Attention Residuals revisits how a network combines its earlier work. Explore what changes when every layer no longer gets the same weight.",
  "category": "Research notes",
  "readTime": "6 MIN READ",
  "paper": {
   "kind": "attention",
   "number": "106",
   "title": "Attention Residuals",
   "authors": "Kimi Team",
   "released": "First posted 16 March 2026",
   "status": "Technical report",
   "url": "https://arxiv.org/abs/2603.15031"
  },
  "sections": [
   {
    "title": "A deeper network has more work to carry forward.",
    "paragraphs": [
     "Imagine a design review where every previous comment gets carried into the next meeting at the same volume. Some comments still matter. Others belong to decisions that have already been settled. More discussion does not automatically produce a clearer decision.",
     "A neural network is not a meeting, but the analogy gives us a useful question: how should a later layer use representations produced earlier? Residual connections provide paths for information and gradients. Choosing how to combine those paths is an architectural decision with consequences for training.",
     "The interesting part of this paper is where it looks for improvement. It revisits the connections between layers rather than adding another instruction, dataset or benchmark-specific trick. For anyone managing model development, it is a reminder to examine the structure that carries the work, not only the work being added."
    ]
   },
   {
    "title": "Replace fixed accumulation with a learned mixture.",
    "paragraphs": [
     "The Kimi team proposes Attention Residuals, or AttnRes: softmax attention over preceding layer outputs replaces fixed residual accumulation. Learned, input-dependent weights determine which earlier representations contribute. Block AttnRes groups representations to reduce the memory and communication burden of the full version.",
     "The report evaluates scaling and integrates the method into a Kimi Linear model with 48 billion total and three billion active parameters, trained on 1.4 trillion tokens. It reports improved downstream results across its evaluated tasks. Those are the authors’ experiments, not measurements produced by this page.",
     "Think of the mixture weights as a routing decision. They are not labels saying that one layer is universally good or bad. A different input can call for a different combination. A large weight also does not, by itself, establish a complete causal explanation of a prediction."
    ],
    "equation": "Illustrative mixture: αᵢ = softmax(similarityᵢ / temperature); output = Σᵢ αᵢ × valueᵢ"
   },
   {
    "title": "Make the routing visible.",
    "paragraphs": [
     "The experiment has eight invented unit vectors, one for each source layer. Pick a query direction and adjust temperature. Similarity to that direction sets the scores; softmax turns them into weights that sum to one. The green bars show the resulting allocation, alongside an equal-weight reference.",
     "Lower temperature concentrates the allocation. Higher temperature spreads it more evenly. The projection measures how far the mixed vector points along the selected query direction. It is a geometric quantity in this toy example, not model accuracy, loss reduction or a benchmark result.",
     "This deliberately leaves out learned pseudo-queries, normalization details, real hidden states, blocks and distributed execution. The temperature control is a teaching device. Its purpose is to let you inspect normalized mixing, not reproduce the training recipe or prove that sharper attention is always better."
    ]
   },
   {
    "title": "A better route still has a bill to pay.",
    "paragraphs": [
     "Accessing earlier representations takes storage and movement. Before celebrating a lower loss, I would ask what happens to peak memory, communication, wall-clock training and inference at the operating batch sizes. A model that is cheaper in one accounting system can be expensive in another.",
     "A useful comparison holds the training data, evaluation protocol and practical resource budget steady. Run several seeds where feasible, inspect learning curves and separate training stability from final quality. Then test the tasks that matter to your application instead of treating an aggregate score as a delivery guarantee.",
     "For a small team, training a frontier model solely to try a connection change would be a poor first experiment. Begin with a tractable research baseline and the authors’ resources. Establish that the implementation behaves as intended before scaling it."
    ]
   },
   {
    "title": "The practical lesson is about selective reuse.",
    "paragraphs": [
     "Try moving the query from one source to another while keeping temperature fixed. Then keep the query fixed and change temperature. Those are different changes: one alters what is relevant, the other how strongly the routing favors it. That distinction is easier to see in the bars than in an equation alone.",
     "I would describe this paper to a technical leadership team as a proposal for better information reuse. The investment decision depends on whether the measured benefit survives implementation cost, realistic workloads and independent evaluation. The diagram makes the mechanism approachable; the paper and code are where a reproduction should begin.",
     "An architecture result earns its place in a product when someone can explain both its gain and its operating cost. That is the standard I would use here."
    ],
    "takeaway": "Inspect the allocation, then measure the full cost of making it."
   }
  ],
  "modelTitle": "Choose which earlier representation matters.",
  "modelIntro": "Change the query direction and mixing temperature. Compare normalized attention with an equal-weight reference.",
  "assumptions": "Eight synthetic two-dimensional unit vectors. Similarity and temperature are chosen for explanation. No learned query, real language model, block implementation, training or benchmark inference runs here. Projection is not predictive quality.",
  "sources": [
   {
    "label": "Attention Residuals",
    "url": "https://arxiv.org/abs/2603.15031",
    "note": "First posted 16 March 2026. Technical report. The primary source for the method and reported evidence."
   },
   {
    "label": "Authors’ implementation and supporting material",
    "url": "https://github.com/MoonshotAI/Attention-Residuals",
    "note": "Original project resources. The browser experiment is an independent teaching illustration, not this implementation."
   }
  ]
 },
 {
  "kind": "paper",
  "slug": "engram-conditional-memory",
  "title": "Stop recomputing what you can look up.",
  "deck": "Engram adds conditional memory to a language model. The useful question is which work deserves computation and which patterns can be retrieved.",
  "category": "Research notes",
  "readTime": "6 MIN READ",
  "paper": {
   "kind": "engram",
   "number": "107",
   "title": "Conditional Memory via Scalable Lookup: A New Axis of Sparsity for Large Language Models",
   "authors": "Cheng and colleagues / DeepSeek-AI and collaborators",
   "released": "First posted 12 January 2026; revised July 2026",
   "status": "Research preprint",
   "url": "https://arxiv.org/abs/2601.07372"
  },
  "sections": [
   {
    "title": "Some work is familiar before the sentence is finished.",
    "paragraphs": [
     "An engineer reading “surface finish” does not need to rediscover the phrase every time it appears. Familiar local patterns provide a starting point; the surrounding context determines what to do with them. It is useful to distinguish storing a pattern from reasoning about the current situation.",
     "That distinction suggests a resource question for a language model. If a frequently encountered pattern can be represented by a lookup, should expensive neural computation spend the same effort reconstructing it on every occurrence?",
     "This is not a proposal to replace reasoning with a glossary. Consider “bearing load” in a specification and “bearing” in a navigation instruction. A stored association can help in one setting and distract in another. A memory mechanism needs a way to use context as well as an address."
    ]
   },
   {
    "title": "Retrieve a pattern, then decide how much to use.",
    "paragraphs": [
     "Engram retrieves learned embeddings using hashed token n-grams, then fuses them with the current hidden state through context-aware gating and a lightweight convolution. The paper treats conditional memory as complementary to conditional computation in mixture-of-experts models.",
     "The authors report gains against parameter- and FLOP-matched baselines, and study how to allocate capacity between memory and computation. Their implementation resources expose a concrete route for investigating the mechanism. The browser example below is a much smaller analogy, with no trained embeddings.",
     "A gate is worth paying attention to. Finding a memory entry does not guarantee that its contents fit the current context. Retrieval and use are two decisions. Keeping them separate makes it easier to ask what happens when the address is ambiguous or the retrieved information is unhelpful."
    ],
    "equation": "Teaching sketch: memory contribution = context gate × retrieved value"
   },
   {
    "title": "A small table makes collisions easy to see.",
    "paragraphs": [
     "The experiment hashes eight invented engineering phrases into a table. Choose a phrase, then change the number of slots. Two different phrases can land in the same slot. The drawing shows all occupants rather than pretending that a collision is an exact semantic match.",
     "The context gate is a manual slider. A retrieved value of two invented units is multiplied by the gate. At zero, the memory contributes nothing. At one, the whole illustrative value passes through. This is ordinary arithmetic used to explain the separation between retrieval and fusion.",
     "The real method uses multiple hash heads, token-based keys, learned vectors and contextual computation. This single-hash phrase table omits those features. A collision count here is not an estimate of Engram’s error rate, and moving the gate does not simulate its learned judgment."
    ]
   },
   {
    "title": "Memory capacity and compute cost are different budgets.",
    "paragraphs": [
     "I would evaluate a memory-augmented model with separate measurements for model quality, memory footprint, bandwidth and latency. Table capacity is only one part of the cost. A system also has to fetch the right entries at the right time under the load it will actually serve.",
     "A practical experiment should include frequent and rare patterns, ambiguous contexts and unfamiliar inputs. If the proposed benefit comes mainly from repeated local patterns, a test set containing only those patterns will tell an incomplete story. Include cases where blindly trusting a familiar phrase would be wrong.",
     "Keep a conventional baseline and hold the important budgets steady. Record what changed in data, compute and infrastructure. That makes it possible to tell whether the idea improved the system or simply moved expense into a category the first comparison did not count."
    ]
   },
   {
    "title": "Use the lookup to ask a sharper design question.",
    "paragraphs": [
     "Try shrinking the table until the selected phrase shares its slot. Then lower the gate. You can suppress the contribution, but you have not made the table more discriminating. Increase the table size and observe that you changed a different part of the mechanism.",
     "That separation is useful beyond language models. A cached calculation, retrieved document or remembered operating procedure still needs a decision about applicability. The engineering value comes from assigning each kind of work to a suitable mechanism and measuring the complete result.",
     "I would keep the headline practical: familiar patterns may deserve a cheaper path, while the model retains responsibility for context. Whether that division pays off is an empirical question for the workload."
    ],
    "takeaway": "A retrieved pattern is a candidate contribution, not an automatic answer."
   }
  ],
  "modelTitle": "Inspect the address and the gate.",
  "modelIntro": "Change table size, select a phrase and decide how much of an illustrative retrieved value passes through.",
  "assumptions": "Eight invented phrases hashed into one small table with a simple polynomial hash. Manual scalar gate and invented value of two units. This is not Engram token hashing, multi-head collision handling, learned gating, retrieval quality or hardware timing.",
  "sources": [
   {
    "label": "Conditional Memory via Scalable Lookup: A New Axis of Sparsity for Large Language Models",
    "url": "https://arxiv.org/abs/2601.07372",
    "note": "First posted 12 January 2026; revised July 2026. Research preprint. The primary source for the method and reported evidence."
   },
   {
    "label": "Authors’ implementation and supporting material",
    "url": "https://github.com/deepseek-ai/Engram",
    "note": "Original project resources. The browser experiment is an independent teaching illustration, not this implementation."
   }
  ]
 },
 {
  "kind": "paper",
  "slug": "language-models-over-bytes",
  "title": "What the tokenizer hides.",
  "deck": "A byte-level language model starts with the actual encoding of text. Byteification asks whether we can get there without throwing away a useful pretrained model.",
  "category": "Research notes",
  "readTime": "6 MIN READ",
  "paper": {
   "kind": "bytes",
   "number": "108",
   "title": "Retrofitting language models to operate over bytes",
   "authors": "Minixhofer and colleagues",
   "released": "Journal publication 7 October 2026",
   "status": "Peer-reviewed / Nature",
   "url": "https://www.nature.com/articles/s41586-026-11111-4"
  },
  "sections": [
   {
    "title": "A small character can carry the whole requirement.",
    "paragraphs": [
     "In an engineering drawing, a decimal point can change the tolerance. In code, a space or bracket can change behavior. A model that reads text through larger units still has to recover the fine structure when the task depends on individual characters.",
     "Try the difference between “12.50 µm” and “1250 µm.” A reader can notice the point and the unit immediately. Designing a representation that makes those details accessible is a different concern from teaching the model what a tolerance means.",
     "This paper is interesting because it challenges a boundary many application developers inherit without examining: the conversion from text into the sequence the model processes. Changing that boundary can affect what information is easy to use and how much computation is needed."
    ]
   },
   {
    "title": "Keep the useful core and change its interface.",
    "paragraphs": [
     "The authors describe byteification, a two-stage conversion of pretrained subword models. Local components encode bytes into patches and decode the global model’s representations back toward byte predictions. Stage one trains the new components while freezing the global model; stage two trains the full system.",
     "The paper reports stronger results than earlier byte-level approaches and advantages on character-level reasoning tasks. The accompanying Bolmo project provides training and model resources. These findings motivate investigating byte-level representations; they do not establish that every task or deployment becomes faster.",
     "The useful engineering pattern is adaptation around an existing core. If a costly component already works, changing its input and output machinery may be more tractable than rebuilding the entire system. The conversion still requires substantial training and evaluation."
    ],
    "equation": "Teaching accounting: byte count = sum of the bytes in every displayed patch"
   },
   {
    "title": "Inspect the encoding yourself.",
    "paragraphs": [
     "The experiment uses your browser’s UTF-8 encoder. Type a short string and inspect the hexadecimal bytes. An ASCII character occupies one byte; many other characters occupy more. The test-tube emoji, for example, takes four UTF-8 bytes even though it is one Unicode code point.",
     "Change the patch width to group that same byte stream into fixed-size chunks. The underlying bytes stay identical. A larger group means fewer groups, but this arithmetic alone says nothing about speed, understanding or the right boundary for a model.",
     "These fixed byte groups are an illustration, not the paper’s learned boundary mechanism or a real subword tokenizer. A group can end partway through a multibyte character. The full stream remains decodable; an individual group is not promised to be readable text. That distinction is why the display uses hex."
    ]
   },
   {
    "title": "Measure the detail and the cost together.",
    "paragraphs": [
     "For a practical evaluation, I would assemble cases where exact text matters: identifiers, units, Unicode, structured records and small code edits. Include normal language tasks too. A representation change should be judged on what it gains and what it may give up.",
     "Measure throughput, latency and memory at comparable workloads rather than comparing raw byte counts with token counts as if they were interchangeable. Output quality should be assessed with task-appropriate checks. An executable test is often more useful than an impression that a code sample looks plausible.",
     "Keep spelling-level and semantic questions separate. Reading a decimal accurately does not imply that the model selected the correct engineering formula. Fine-grained access to the input is one requirement; applying domain knowledge correctly is another."
    ]
   },
   {
    "title": "The representation is part of the product decision.",
    "paragraphs": [
     "Try a plain identifier, a string with an accented letter and a string with an emoji. Watch code-point count and byte count separate. Then change patch width and confirm that the total number of bytes does not change.",
     "The stage toggle explains which components are trainable in the two-stage outline. It does not train anything. Use it to think about the budget and verification burden of introducing new components around a pretrained system.",
     "The broader lesson is to inspect the assumptions hidden in preprocessing. When an application depends on exact symbols, representation choices deserve the same scrutiny as prompts and output checks. The paper offers a concrete research direction for doing that without abandoning pretraining."
    ],
    "takeaway": "Counting smaller units is easy. Learning to use them efficiently is the research problem."
   }
  ],
  "modelTitle": "Look at the bytes before the model sees them.",
  "modelIntro": "Type a short string, change the illustrative byte-group width and inspect the two-stage conversion outline.",
  "assumptions": "Actual UTF-8 encoding of at most 96 input characters. Fixed-width byte groups illustrate compression accounting only; they are not learned Bolmo patches or real subword tokens. The stage toggle is descriptive. No language model or training executes.",
  "sources": [
   {
    "label": "Retrofitting language models to operate over bytes",
    "url": "https://www.nature.com/articles/s41586-026-11111-4",
    "note": "Journal publication 7 October 2026. Peer-reviewed / Nature. The primary source for the method and reported evidence."
   },
   {
    "label": "Authors’ implementation and supporting material",
    "url": "https://github.com/allenai/bolmo-core",
    "note": "Original project resources. The browser experiment is an independent teaching illustration, not this implementation."
   }
  ]
 },
 {
  "kind": "paper",
  "slug": "paper2agent-executable-research",
  "title": "A paper you can put to work.",
  "deck": "Paper2Agent turns research methods into callable tools. The useful test is whether those tools execute the method faithfully, not whether they can talk about it.",
  "category": "Research notes",
  "readTime": "6 MIN READ",
  "paper": {
   "kind": "agent",
   "number": "109",
   "title": "Reimagining research papers as interactive and reliable AI agents",
   "authors": "Miao and colleagues",
   "released": "Journal publication 16 September 2026",
   "status": "Peer-reviewed / Nature",
   "url": "https://www.nature.com/articles/s41586-026-11044-y"
  },
  "sections": [
   {
    "title": "Reading the method is only the beginning.",
    "paragraphs": [
     "You find a paper that seems relevant to a problem. The result is promising, but using it means locating the code, reconstructing the environment, understanding the input format and deciding which script actually reproduces the example.",
     "That work is often where a useful method stops traveling. A good explanation lowers the conceptual barrier; an executable interface can lower the operational barrier. The two solve different problems.",
     "For a team evaluating new research, I want the original method to become testable on a controlled example before anyone argues about a production use case. A conversational interface is useful if it helps get us there without hiding what ran."
    ]
   },
   {
    "title": "Wrap the research in a tested tool surface.",
    "paragraphs": [
     "Paper2Agent analyzes a paper and its codebase, constructs an MCP server and generates and runs tests to refine the tools. A chat agent can then invoke those workflows. The paper demonstrates scientific case studies, including AlphaGenome, Scanpy and TISSUE.",
     "The authors also report limitations: some repositories cannot be successfully converted, and scientific interpretation still requires human judgment. Tool execution does not make a generated conclusion authoritative. Those boundaries belong in an explanation of the method, not in an appendix nobody reads.",
     "The project repository provides the workflow and supporting material. Before using it on a valuable dataset, I would start with a disposable environment and a known reference result. The first question is whether the wrapper faithfully invokes the underlying method."
    ]
   },
   {
    "title": "Make the failure visible before exposing the tool.",
    "paragraphs": [
     "The local experiment is a state machine with a small reference fixture. Its expected result is the sum of two, three and five: ten. Select an environment problem, a schema problem or a reference mismatch. The workflow stops at the relevant stage and leaves later stages waiting.",
     "Apply the explicit repair toggle to show the passing route. This models a dependency between checks; it does not actually install packages, repair a repository or run an agent. The fixture is deliberately simple so you can see which evidence permits the next step.",
     "A real workflow needs much richer checks: input validation, expected outputs, failure behavior and provenance. One passing example is evidence about that example. It is not proof that every scientific question the user can phrase is supported."
    ],
    "equation": "Demonstration fixture: sum([2, 3, 5]) = 10"
   },
   {
    "title": "Keep a reproducibility record with the answer.",
    "paragraphs": [
     "I would expect a usable research tool to record the code revision, environment, input identifiers, parameters and output artifacts. If an answer changes, that record gives someone a route to explain why. A natural-language summary alone is not enough.",
     "Use independently checked fixtures where possible. A wrapper can pass a test that merely repeats its own mistaken assumption. Compare against the paper’s documented examples and inspect important intermediate results. Negative tests matter too: malformed inputs should produce an understandable failure.",
     "Keep authorization and resource limits outside the language model’s discretion. A tool that reads a local fixture and a tool that submits a long remote compute job should have different operating rules. Reproducibility and controlled execution make the interface more useful, not less conversational."
    ]
   },
   {
    "title": "Executable research changes the handoff.",
    "paragraphs": [
     "The appealing future is a method that arrives with a callable, testable entry point. A domain expert can ask a question, inspect the operation and reuse the result without first becoming the maintainer of an unfamiliar repository.",
     "For technical leaders, that creates a practical acceptance test for research adoption. Ask for a reproducible fixture, a documented boundary of supported use and a named owner for updates. Measure setup time, correctness and the effort needed to adapt the method to a second dataset.",
     "The demo ends at a verified toy tool, not a scientific discovery. That is intentional. A reliable handoff is a valuable result on its own. Once that exists, the team can evaluate whether the method answers the real question."
    ],
    "takeaway": "A conversational wrapper earns trust through visible execution and independent checks."
   }
  ],
  "modelTitle": "Find the check that blocks the handoff.",
  "modelIntro": "Choose a simulated failure and apply a repair. Watch which later stages can proceed and whether the reference fixture matches.",
  "assumptions": "Deterministic browser workflow and an invented sum fixture. No paper ingestion, package installation, MCP server, agent execution or scientific analysis occurs. The repair toggle stands in for work that a real system would have to perform and verify.",
  "sources": [
   {
    "label": "Reimagining research papers as interactive and reliable AI agents",
    "url": "https://www.nature.com/articles/s41586-026-11044-y",
    "note": "Journal publication 16 September 2026. Peer-reviewed / Nature. The primary source for the method and reported evidence."
   },
   {
    "label": "Authors’ implementation and supporting material",
    "url": "https://github.com/jmiao24/Paper2Agent",
    "note": "Original project resources. The browser experiment is an independent teaching illustration, not this implementation."
   }
  ]
 },
 {
  "kind": "paper",
  "slug": "alphagenome-context-and-resolution",
  "title": "The detail needs its context.",
  "deck": "AlphaGenome brings a long sequence and fine-grained outputs into one model. Explore why a local change can be hard to interpret through a narrow window.",
  "category": "Research notes",
  "readTime": "6 MIN READ",
  "paper": {
   "kind": "genome",
   "number": "110",
   "title": "Advancing regulatory variant effect prediction with AlphaGenome",
   "authors": "Avsec and colleagues / Google DeepMind and collaborators",
   "released": "Journal publication 28 January 2026; initial announcement June 2025",
   "status": "Peer-reviewed / Nature",
   "url": "https://www.nature.com/articles/s41586-025-10014-0"
  },
  "sections": [
   {
    "title": "The nearby explanation may be incomplete.",
    "paragraphs": [
     "When a small change has an unexpected effect, it is tempting to inspect only its immediate surroundings. That is a reasonable first move, but it assumes the relevant context is nearby. A narrow view can be precise and still miss the relationship that matters.",
     "Genomic regulation presents a demanding version of that problem. The application needs detailed predictions while accounting for a long sequence. This is a representation challenge as well as a scientific one.",
     "I am interested in the engineering tradeoff: how much context can a model retain while still producing useful local outputs? That question appears in time series, manufacturing records and long documents too, although the underlying mechanisms differ."
    ]
   },
   {
    "title": "Long input, detailed output, several measurements.",
    "paragraphs": [
     "AlphaGenome takes a DNA sequence of up to one million base pairs and predicts diverse functional genomic measurements, including outputs at single-base resolution. The paper studies reference-versus-alternate sequence predictions for variant-effect assessment.",
     "The Nature publication reports evaluations across multiple genomic tasks. Google DeepMind’s project materials describe the model and its use. Those results are specific to their datasets and tasks; they should not be read as proof that an arbitrary variant’s biological or clinical consequences are known.",
     "For this article, the useful abstraction is a comparison: keep the setting explicit, change an input and examine several outputs. Context and measurement choice belong in that comparison. A single score can conceal which predicted quantity changed."
    ]
   },
   {
    "title": "Compare two tracks without pretending to predict biology.",
    "paragraphs": [
     "The drawing contains invented reference and alternate tracks over 150 arbitrary positions. A chosen site and a response region at position 105 shape two smooth curves. Move the site, change an illustrative disruption amount and switch between settings A and B.",
     "The context control crops what is visible. It does not recalculate the underlying synthetic tracks. If the changed site falls outside the visible window, the page calls that out. A cropped view is missing information; it has not established that the site has no effect.",
     "The curves come from hand-written Gaussian functions with a chosen distance attenuation. They are not DNA, gene expression, real tissue behavior or AlphaGenome outputs. Settings A and B are fictional. Their job is to make context, comparison and missing coverage visible without inventing a biological finding."
    ]
   },
   {
    "title": "A prediction needs a validation path.",
    "paragraphs": [
     "If I were evaluating a scientific model, I would first establish the supported input, output meaning and validation setting with domain experts. Then I would design independent tests around the use case. A strong benchmark result is a starting point for that discussion.",
     "Keep experimental measurements distinct from model predictions, and keep the reference and alternate inputs traceable. Inspect uncertainty, coverage and important subgroups where appropriate. A visually compelling difference should lead to a testable question rather than a stronger claim than the evidence supports.",
     "For a technical leader, the resourcing decision includes the cost of validation. Fast prediction can accelerate prioritization, but the team still needs a reliable route to check the cases that matter. The browser illustration does not provide that route for actual genomic data."
    ]
   },
   {
    "title": "Use the window to expose the blind spot.",
    "paragraphs": [
     "Begin with a broad window and move the changed site toward an edge. Narrow the window until the site disappears, then expand it again. The full synthetic difference stays the same while your access to the context changes.",
     "Now compare settings A and B. The invented response changes because the demo assigns different coefficients. That is a reminder to name the setting, not evidence about any actual tissue. The source links are the place to study the real outputs and evaluation.",
     "The transferable lesson is about matching context to a decision. High resolution is valuable only when the relevant relationships remain in view. Treat this as an explanation of that design tension, not a genomic interpretation tool."
    ],
    "takeaway": "A precise view can still be incomplete. Show both the detail and the context boundary."
   }
  ],
  "modelTitle": "Change the view, then inspect what is missing.",
  "modelIntro": "Move an invented changed site, alter the context window and compare two fictional response settings.",
  "assumptions": "All tracks are hand-written synthetic Gaussian curves in arbitrary units and positions. No DNA, real tissue, clinical data or AlphaGenome model is used. Window width changes visibility only. A missing site means missing context, not a measured absence of effect.",
  "sources": [
   {
    "label": "Advancing regulatory variant effect prediction with AlphaGenome",
    "url": "https://www.nature.com/articles/s41586-025-10014-0",
    "note": "Journal publication 28 January 2026; initial announcement June 2025. Peer-reviewed / Nature. The primary source for the method and reported evidence."
   },
   {
    "label": "Authors’ implementation and supporting material",
    "url": "https://deepmind.google/blog/alphagenome-ai-for-better-understanding-the-genome/",
    "note": "Original project resources. The browser experiment is an independent teaching illustration, not this implementation."
   }
  ]
 },
 {
  "kind": "paper",
  "slug": "dinov3-patch-features",
  "title": "A good image label is not enough.",
  "deck": "DINOv3 puts useful local features back in focus. Explore why the relationships between image patches can matter as much as the overall image representation.",
  "category": "Research notes",
  "readTime": "6 MIN READ",
  "paper": {
   "kind": "dino",
   "number": "111",
   "title": "DINOv3",
   "authors": "Siméoni and colleagues / Meta and collaborators",
   "released": "First posted 13 August 2025",
   "status": "Technical report",
   "url": "https://arxiv.org/abs/2508.10104"
  },
  "sections": [
   {
    "title": "Knowing the object is different from finding the detail.",
    "paragraphs": [
     "An inspection system can correctly recognize a part and still miss the small region a quality engineer needs to inspect. An image-level answer and a useful local representation are different requirements. A single classification metric will not tell you whether both are satisfied.",
     "For a factory application, imagine distinguishing the surface around a weld from a reflection nearby. The task may depend on relationships among patches rather than only the identity of the part in the whole frame.",
     "That is why I would read a vision foundation model paper with two questions in mind: what can I do with its global representation, and what can I do with its local features? They need separate evaluations."
    ]
   },
   {
    "title": "Preserve relationships between patches.",
    "paragraphs": [
     "DINOv3 is a self-supervised vision model family. Its report describes Gram anchoring to address degradation of dense features during extended training. The objective compares pairwise similarities of normalized student patch features with those from a Gram teacher.",
     "The report evaluates dense and global vision tasks, while the official repository provides reference PyTorch implementations and model resources. These are research results, not a guarantee that a particular factory defect can be detected without task-specific evaluation.",
     "A useful property of the Gram view is that it concerns relationships. If every feature undergoes the same orthogonal rotation, their pairwise dot products stay unchanged. The coordinates move, but the similarity structure does not. The experiment makes that distinction visible."
    ],
    "equation": "G = X × Xᵀ; illustrative mismatch = mean((Gstudent − Greference)²)"
   },
   {
    "title": "Disturb the features and inspect the matrix.",
    "paragraphs": [
     "The experiment uses sixteen synthetic patches in a four-by-four grid. Each has a normalized two-dimensional vector. The reference vectors form two broad regions; a drift control rotates individual patches by different amounts and disrupts their similarities.",
     "An anchor slider blends each disturbed vector toward its reference and normalizes the result. This is a geometric illustration, not the DINOv3 loss optimizer or its training schedule. At full anchor, the constructed example returns exactly to its reference relationships.",
     "Rotate all student vectors together and watch the Gram mismatch remain unchanged. Select a patch to inspect its similarity to the others. The color map is derived from these invented vectors. It is not a segmentation mask, learned semantic map or DINOv3 inference result."
    ]
   },
   {
    "title": "Evaluate the representation on the job it must do.",
    "paragraphs": [
     "For an inspection project, I would compare a frozen-feature baseline with a supervised baseline on independently collected examples. Split related parts and acquisition sessions carefully. A duplicate view of the same item in training and test can make a weak system look strong.",
     "Test the actual decision: localization, retrieval, segmentation or classification. Include difficult lighting, relevant materials and rare defects. Measure the cost of missed defects and false alarms alongside throughput and memory at the required resolution.",
     "Self-supervised pretraining can reduce dependence on task labels at one stage of development. It does not remove the need for labeled evaluation of the operation you intend to automate. Keep that distinction explicit when estimating the project’s data budget."
    ]
   },
   {
    "title": "Use the matrix to separate movement from damage.",
    "paragraphs": [
     "First set feature drift to zero and sweep the common rotation. The reference and student coordinates differ, but the similarity matrix still matches. Then increase independent drift. Now the relationship structure changes.",
     "Finally add the illustrative anchor and inspect one patch at a time. Look at both the colored grid and the numeric similarity table. A pleasing map alone is not enough; the numbers should explain what the colors mean.",
     "The paper offers a serious foundation-model direction for vision work. The practical contribution of this article is a small way to reason about local consistency before choosing an evaluation. A representation earns its place when it supports the specific decisions your system has to make."
    ],
    "takeaway": "Check the local relationships you need. Global recognition quality does not substitute for that evidence."
   }
  ],
  "modelTitle": "Inspect the relationships, not just the coordinates.",
  "modelIntro": "Disturb patch features, blend toward an illustrative anchor and rotate every vector together. Select a patch to inspect its similarities.",
  "assumptions": "Sixteen invented two-dimensional unit vectors. Independent angular perturbations simulate feature drift. Linear blending followed by normalization is a teaching device, not Gram-loss optimization. The displayed mean squared matrix error is normalized differently from the paper’s summed Frobenius objective. No images, learned features or DINO model run here.",
  "sources": [
   {
    "label": "DINOv3",
    "url": "https://arxiv.org/abs/2508.10104",
    "note": "First posted 13 August 2025. Technical report. The primary source for the method and reported evidence."
   },
   {
    "label": "Authors’ implementation and supporting material",
    "url": "https://github.com/facebookresearch/dinov3",
    "note": "Original project resources. The browser experiment is an independent teaching illustration, not this implementation."
   }
  ]
 }
];
