---
title: "I'm finally making AI Projects"
date: 2026-10-25
---

### The problem

Hallucinations are a known, documented problems for Artifical Intelligence (AI) or AI-based workflows or AI-based applications. (Add 2-3 researches highlighting this problem) NLI-claim verifier tries to use Natural Language Inference and LLM-as-a-Judge approach to find out AI hallucinations for simple use-cases.
Given a source text and a number of claims. This project aims to help user flag AI-hallucinations by informing users whether a claim is supported or not by the source.

Traditional approaches such as checking it programmatically or manually would work but it requires a lot of work ( i.e. time and effort ). Instead, we use AI for what it does best and leaves user with the decision making process.

### Behavior definition

Definition of correct is, given a source text, project classifies it as supported, contradicted or cannot confirm along with citations for each result(s) or vedict(s). It does the tedious work of cross checking AI generated summaries, briefs, etc., and provides user which claims might need a re-check. Instead of having to do recheck for everything.

What it does not do?  
It does not replace the human decision making, it helps in speeding up the decision making process.

```json

behavior_spec = {
  "task": "Classify each claim as SUPPORTED, CONTRADICTED, or CANNOT_CONFIRM against a user-provided source, with cited evidence",
  "constraints": [
    "Verdicts use only the provided source, never outside knowledge",
    "Every verdict cites the source sentences it relied on",
    "Default to CANNOT_CONFIRM, not SUPPORTED, when evidence is weak",
    "Latency under 5s per request"
  ],
  "failure_modes": [
    "Retrieval misses the relevant passage, giving a false CANNOT_CONFIRM",
    "Distractor passage with high word overlap, giving a false SUPPORTED",
    "Claim needs multiple passages combined (multi-hop)",
    "Negation, numeric mismatch missed by NLI"
  ],
  "fallback_behavior": "Below the confidence threshold, return CANNOT_CONFIRM and flag for human review",
  "non_goals": "Does not make the final call. It narrows what a human needs to re-check.",
  "eval_criteria": {
    "retrieval": "recall@5 >= 85% on gold set",
    "verdict_accuracy": "per-class precision/recall on noise, distraction and competence sets",
    "false_supported_rate": "the costliest error, tracked separately",
    "latency": "p95 < 5s"
  }
}

```

### Project Architecture

> Project stack

Data flow: User query and source text -> Embeddings -> Vector search ( semantic search top_k=5 retrieve top 5 results ) -> Pass (claim, top 5 results) to NLI LLM -> Eval

Project uses two LLMs one to create embeddings, and second one to create evaluate the (claim, top results) pairs.

User provides source and claims text --> those are converted into embeddings --> for each claim top 5 results are selected --> (claim, top 5 results) pairs passed to NLI --> verdict.

#### First dry

The first dry run spun up a simple version of the entire process. Mostly using the default everything. During this time, I was using the encoder `cross-encoder/nli-deberta-v3-base` for both claim and top results retrieval and claim and top results verification.

For small test cases it was okay, but as the amount of text increased in the source, the entire workflow slowed down. Since I wasn't aware about the difference between the `cross-encoder` and `bi-encoder`. I resorted to using `cross-encoder` for retrieval and verification. [Link](https://colab.research.google.com/drive/1T9D0ti2n1fDNDoUdrK9yJWX8prnW1MMJ?authuser=4#scrollTo=HDsqOj0W3iJk)

The entire workflow slowed down because of the `cross-encoder` checks a claim and a sentence at a time. I would have claimed "eventual research, long-nights, early-days or two lead towards the breakthrough of using" a `bi-encoder` for retrieval. But that's not the case, I was casually reading about RAG systems to understand to understand what they are and how they work. There I stumbled upon the concept of `vector databases` I thought this might help me, so when I was looking at this and wondering if I can use it for my project, that's when I realised I'm complicating things instead of storing and retrieving isn't my use-case. But I can use `bi-encoder` a term I learned later, ( LLM ) for doing the retrieval and providing those results to my NLI claim verifier. So it does what it does best i.e. compare two sentences to determine the relationship. Attach a few gifs about the process.

#### Second dry run

The workflow improved with the split responsibilities for retrieval and verification. But again, I had started with whatever defaults were provided in the documentation, tutorials, etc., no questions asked. Ran the workflow it improved on performance ( i.e. reduced latency show how and how much ). But I was thinking it can be improved further. That's when I stumbled upon `Hugging face Build Small Hackathon`, the premise was simple using small models only ≤ 32 billion either solve a real problem for someone you know ( Backyard AI ) or build something that wouldn't exist without AI. The project [GigScan](https://medium.com/@kieran_adair/small-models-big-potential-building-gigscan-as-part-of-the-hugging-face-build-small-hackathon-8f86e1429325) really impressed me so I started working on my similar backyard AI project.

The goal of second dry run really was, to test my hypothesis whether splitting the responsibilities will work or not. To my surprise it did work, addition of a retriever helped speed up the bottleneck process.

Once the entire new workflow was working, it was time to perform some evals. So I started digging into evals. Understanding what evals are, why is it necessary, how do they work, what do they inform me, what type of evals exists, when to trust benchmarks, how to use them and how to determine between different models which models to choose from. The CampusX [playlist](https://youtu.be/6W92_t9FveA) explains helped me alot to learn about evals.

#### Evals for shortlisting retriever

After learning about evals, the next task was using evals to shortlist models from the offerings. Before evals, I would've defaulted to either well-known models closed or open source. Now, I go to leaderboards to shortlist candidates for my workflow. I test those candidates on my dataset, and if the performance, cost, latency, context, outputs are within my acceptance criteria then and only then I shortlist models.

For this process also I had started with the acceptance criteria of higher the `recall@5` value the better.

##### Model shortlisting process:

1. Understand the problem statement and write down project requirements.
   1. Task - What am I building? It is a fact-grounding checker. Checks if the claim is backed by the source documents.
   2. Cost - What is the budget for procurring models? In my case, it's zero. Because I wanted to see what I can build with open-source models first before moving to the paid tier.
   3. Latency - What is the tolerable latency for the project? Ideally under 5s, it's my own experience that if something doesn't load under 5s I just leave that website or service. So I've based it on my experience.
   4. Context - What is the context window? For my use-case since, there is no live-chat like a RAG system. So I needn't worry about context.
   5. Deployment - What is the deployment strategy? For my use-case, on huggingface as a gradio app.
   6. Correctness - Is correctness of the output important to my project? Yes, it's extremely important.

> After using this checklist and hackathon's guidelines. The following models were shortlisted for evals. Whichever model gave me a better retrieval on my golden dataset for retrieval eval, that would be shortlisted.

2. Shortlisted models.
   1. google/embeddinggemma-300m
   2. BAAI/bge-large-en-v1.5
   3. sentence-transformer/all-mpnet-base-v2
   4. Qwen/Qwen3-Embedding-0.6B
   5. nvidia/Nemotron-3-Embed-1B-BF16

3. Run evals on shortlisted models.
   | embedder model                            | recall@5 |
   | ----------------------------------------- | -------- |
   | 1. sentence-transformer/all-mpnet-base-v2 | 79%      |
   | 2. BAAI/bge-large-en-v1.5                 | 86%      |
   | 3. google/embeddinggemma-300m             | 80%      |
   | 4. Qwen/Qwen3-Embedding--0.6B             | Untested |
   | 5. nvidia/Nemotron-3-Embed-1B-BF16        | Untested |

> **Note**: Qwen and Nemotron-3 are currently untested for my use-case because of my system limitations. I'm trying to figure out how to test them for my use-case. Once that is done, the above table would be updated with those numbers.

Retriever dataset: The dataset created to test the embedder models consists of 50 questions based on the book [`Crime and Punishment`](https://www.gutenberg.org/cache/epub/2554/pg2554-images.html), first 2 chapters. For creating the dataset I referred to two research papers <sup>[1](https://arxiv.org/pdf/2111.13057v3)</sup> <sup>[2](https://arxiv.org/abs/2004.04906v2)</sup>.

#### Evaluation strategy

Evaluation strategy has two sub-parts one is model evals to shortlist which models to use for my project. And second one is application eval. To understand application evaluation.

Currently the model evals are done. Model evals support the "why" part of the question for the selected model.

| model                          | eval_strategy                 |
| ------------------------------ | ----------------------------- |
| 1. embedder model `bi-encoder` | recall@5 > 80%                |
| 2. NLI model `cross-encoder`   | per category eval > threshold |

( Work on it next immediately ) Yes I almost have the report ready

#### Failure modes

There were a couple of failure modes, I started with only `cross-encoder` model only. And started to see performance bottlenecks as the source text started growing. Because `cross-encoder` checks a claim and a sentence from the source. As the source grew comparison became a real bottleneck.

Embedder model was added to create embeddings so the `cross-encoder` can focus on sentence comparison. But a retriever that doesn't retrieve correct chunks to pass the NLI model. Becomes a silent failure point. So retrievers were evaluated on their `recall@5`. Better the retriever performance, increased the chances of proper classification.

The NLI model calculation is working. Speed being slow because running on CPU. Maybe installing cuda would speed up the process. Document the CPU speed and then run on cuda for parallel processing to increase the speed. On an average for creating embeddings by CPU it was taking 2 minutes and for processing NLI claims around 5 mins. With implementation of CUDA embeddings are created in 10 seconds whereas NLI is getting done in under 1 minute.

#### Metrics That Matter

Lord Kelvin once said “If you cannot measure it, you cannot improve it”. Nothing more truer could have been said. So for this application a couple of things are being tracked to measure, monitor and improve system health.

| metrics measured                                                                                     |
| ---------------------------------------------------------------------------------------------------- |
| 1. Retriever `recall@5 ` rate                                                                        |
| 2. NLI performance against stress <sup>[1](https://www.alphaxiv.org/pdf/1806.00692)</sup> categories |
| 3. Latency: Time user had to wait for the classification                                             |
| 4. Correctness : Number of correct classification                                                    |
| 5. Evidence Accuracy: How accurate was the evidence provided                                         |
| 6. Acceptance rate: For wrong or incorrect classification drift                                      |

Known NLI limitations and how to present them to users.

#### What I'd improve next

Need to figure out ways to circumvent NLI limitations so this becomes a well-rounded tool. Add application level evals, monitoring and alerting.
