---
title: "Observability Needs A Reboot"
excerpt: "Observability Needs A Reboot is revolutionizing India's digital ecosystem, enhancing transparency and efficiency in finance, healthcare, and governance. India's pioneering efforts integrate blockchain for secure, scalable, and innovative digital infrastructure. This transformation drives India's journey towards a robust digital society."
coverImage: "/assets/blog/observability-needs-a-reboot/cover.jpg"
date: "2023-05-12T05:35:07.322Z"
author:
  name: Navya Srivastav
  picture: "/assets/blog/authors/navyayy.png"
ogImage:
  url: "/assets/blog/observability-needs-a-reboot/cover.jpg"
---

## Observability Needs A Reboot

Observability solutions have not kept up with growing needs of digitization and cloud growth. They do not address the needs of the new demands of customers, and are too expensive for many. There exists a significant disparity between the needs of observability solution users and the services offered by vendors. Having used these solutions for over a decade, I have observed these issues firsthand and will be discussing them in this blog.

# Challenges in Logging Solutions

### 1.   Log Volume
    

The era of small-scale log production by application clusters is long gone. Companies that run their software on over 50 machines can easily generate more than `2 terabytes` of log data per day, resulting in a volume of `60 terabytes` with a 30-day retention policy. Add the searching, indexing, RAM requirements at a high volume demands a substantial cluster. Additionally, logging expenses can consume over 30% of your cloud budget. Adopting a SaaS solution for logging comes at a prohibitively high cost. Consequently, users must resort to some undesirable measures, which will be discussed in more detail.

### 2. Cardinality
    

Although logs may contain extraneous data, they provide the most accurate and detailed observability signal available today. This can result in an unintended consequence of high cardinality, which presents significant challenges for logging vendors. High cardinality issues such as expanded index sizes, reduced compression ratios, increased cluster node growth, and sluggish queries arise. As a result, users may need to refrain from logging such high cardinality fields or decrease their log volume.

### 3. Interactive Query Experience

To enable users to quickly debug production issues, it is essential to provide a fast and interactive querying experience. Delays in log query times are directly linked to a longer mean time to resolution (MTTR).

### 4. Reliability

The logging solution's availability must meet or surpass the application's availability needs, which are often at a standard of 99.9%. As log volume and cardinality increase, more components may fail. Some SaaS vendors measure availability only after users' logs enter their network. For mission-critical applications, this entails hosting the logging cluster within the application cluster's network and providing geo-redundant replication, which incurs additional expenses.

### 5. Cost
    

This poses a challenge for users, a log volume as small as 2 terabytes per day can cost anywhere between `$0.5 million to $2 million` annually for a SaaS solution. Self-hosted options come with similar costs, except for the egress costs, that can be saved. However, many finance departments may not approve such large budgets, leaving users with no choice but to resort to one of the following workarounds:

-   Reduce Retention
    
-   Reduce loglines
    
-   Reduce cardinality
    
-   Reduce replication
    

  

Each of above will have the following side-effects:

-   Low visibility
    
-   Loss of historical data
    
-   Developer time spent on non-core business
    
-   Low visibility
    
-   Increased chance of data loss, high MTTR
    

  

# Challenges in Tracing solutions

Distributed tracing is an essential observability signal that significantly aids in identifying the causes of application slowness, thereby reducing MTTR. However, existing tracing solutions present several challenges, such as volume, cardinality, and cost.

  

### 1. Volume/Cardinality:
    

Traces contain two essential components: traceID/spanID and tags. SpanID is unique to each event, while TraceID is shared across a set of spans (often 20 on average). As a result, traces have quite a high cardinality. Tags, on the other hand, have reasonable cardinality, and filter-based searches are conducted using tags. TraceID and tags are used for group-by queries. Since there are millions of traceIDs, group-by queries create an excessive number of buckets, placing significant constraints on tracing solutions. Consequently, users must gather a sample of spans, which can be achieved through various techniques such as head-based sampling, tail-based sampling, and dynamic sampling. Each technique has its own advantages and disadvantages. Head-based sampling puts the least burden on the tracing solutions, but it has a 99% chance of dropping slow or erroneous traces. Dynamic sampling increases the sample rate of a specific service,host, or cluster. This can result in a temporary volume increase that helps in diagnosing certain components or clusters. Tail-based sampling is one of the best methods from the user's perspective as it collects 100% of traces and decides to keep only the slow or erroneous traces. However, it places a large burden on tracing solutions Which must have the capacity to temporarily store/analyze the trace before deciding to accept it or drop it.

### 2. Cost:
    

The cost situation is similar to logging expenses. Users are forced to employ head-based sampling, instrument a subset of their modules, or reduce sampling frequency. Despite taking these measures, tracing costs can still be significant.

# Challenges in Metrics solutions

This is the first observability signal that any application developer deploys. It provides an initial insight into the service, including whether it is operational, its level of performance, and other key metrics. This signal gives an aggregate view of your service’s overall health.

  

### 1. Cardinality
    

The most significant issue users encounter with metrics is the inherently high cardinality tags produced by cloud computing, virtualization, containers, and Kubernetes. This forces users to drop high cardinality tags, resulting in a loss of granularity, or pre-aggregate on some tags, thereby leading to the expenditure of compute resources.

### 2. Cost
    

In addition to logging and tracing costs, expenses are also a significant challenge for users when it comes to metrics. For standard visibility metrics into a service, users can easily spend hundreds of thousands of dollars on their metric bill.

  

# Challenges across Observability signals:

### 1. Fragmented vendors:
    

No single vendor provides acceptable solutions for all three signal types: metrics, log, traces. While some excel in one signal type, they may not in others.. Some vendors may be inexpensive for one signal type but extremely costly for others.

  

### 2. Signal Correlation
    

Looking alone at metrics, logs or traces is not enough from a user's perspective. Users receive alerts on metrics, they then analyze the associated time series to identify the problem. Then they take this understanding and switch to another product (logs or traces) and start their debugging process, painstakingly carrying the context manually each time. Ideally, the alert containing the problematic time series should include the correlated logs/traces, allowing users to view logs, metrics, and traces on a single User Interface, correlate between them, and effortlessly switch between them.

  

Observability solution users would appreciate it if vendors could provide the following:

-   True unlimited cardinality
    
-   Signal correlation
    
-   Increased retention
    
-   Interactive query experience
    
-   Reduced storage/compute requirements
    
-   Self-hosting ability
    
-   And most importantly, Reduced Costs
    

In order to meet the above user needs, vendors must fundamentally rethink their architecture and business model.