---
title: "What is A* Search Algorithm?"
excerpt: "Boost your dealership sales with smart marketing! Leverage digital ads, local SEO, and personalized customer experiences to stay ahead in 2024. Adapt to trends like AR, AI, and EVs to drive more leads and conversions! 🚗💨"
coverImage: "/assets/blog/what-is-a-search-algorithm/cover.jpg"
date: "2023-10-21T00:00:00.000Z"
author:
  name: Navya Srivastav
  picture: "/assets/blog/authors/navyayy.png"
ogImage:
  url: "/assets/blog/what-is-a-search-algorithm/cover.jpg"
---

What is A\* Search Algorithm?

## Introduction

In the world of artificial intelligence, graph traversal and pathfinding problems are common terminologies we encounter. Pathfinding algorithms make use of maps, grids and graphs to find optimal paths specifically in games, robotics and navigation devices. Among all optimal solutions, A\* Search Algorithm stands as a powerful tool. Still confused, what exactly makes this algorithm outstanding in the world of AI? Let’s go in depth and explore functions, real-world applications and core components of A\* Search Algorithm.

## What is A\* Search Algorithm?

A\* Search Algorithm is an optimal and efficient algorithm for solving pathfinding problems. Particularly, if we need to find the **shortest** **path** between a starting point and an end goal, A\* would be the best choice. It is versatile and powerful in nature. Widely used in robotics, video games and navigation systems, this algorithm is one of the most critical algorithms in graph traversal.

Pathfinding is the method of finding a feasible way of travel between two points in provided space while considering the given set of rules. The rules may vary from problem to problem such as obstacles or costs. This algorithm is known for finding the most efficient path that can one follow from one point to another. It is a combination of two powerful algorithms viz. **Dijkstra’s algorithm** and **Greedy Breadth First Search**. It is powerful as it optimizes both the estimated and actual cost of reaching a goal.

The best example of this algorithm is the map navigation application in our mobile phones such as Google Maps which helps us find the shortest route to travel considering the traffic and road conditions.

## Graph Representation

In a\*, the space is represented as a graph, where nodes represent positions or states and edges represent transition between states. Edges are associated with costs or a given set of rules. The algorithm moves from the first node to the goal in consideration of the least cost path.

## Formula

A\* Search Algorithm’s formula calculates the cost of reaching a particular node. The total cost of traversal is calculated as:

**f(n)=g(n)+h(n)**  
Where:

* f(n) is the estimated total cost from start node to end goal via node **n**.  
* g(n) is the actual cost from start node to node **n**.  
* h(n) is the heuristic cost (estimated cost) from node **n** to end node.

This heuristic cost or the guess of the remaining cost to the end goal is the additional function of this algorithm which makes it optimal amongst all pathfinding algorithms.

## How does A\* Algorithm work?

## Step-by-step implementation of this algorithm is given below

* **Initialization**: The algorithm starts by placing the starting node in a priority queue. This priority queue also known as open list contains all the nodes that are yet to be evaluated.  
* **Evaluation**: This is the selection process where the node with lowest f(n) value from the queue is chosen for further operations.  
* **Expansion**: The chosen node is evaluated by comparing it with its neighbours. For each neighbour, values of g(n) and h(n) are calculated.  
* **Update**: If a neighbour has a lower f(n) value than the recorded one, it is updated to the open list.  
* **Goal Check**: The algorithm continues until the goal node is reached or the open list is empty which indicates there is no more path to traverse.  
* **Reconstruction**: After finding the goal node, the algorithm reconstructs the path by tracing back from goal to start node.

## Python code

Basic implementation of A\* algorithm in python for a grid-based pathfinding problem is given below:

```python
import heapq

class Node:
    def __init__(self, position, g, h):
        self.position = position
        self.g = g  # Actual cost from start to this node
        self.h = h  # Heuristic cost to goal
        self.f = g + h  # Total cost
        self.parent = None  # To reconstruct the path

    def __lt__(self, other):
        return self.f < other.f

def a_star(grid, start, goal):
    open_list = []
    closed_list = set()

    start_node = Node(start, 0, abs(start[0] - goal[0]) + abs(start[1] - goal[1]))  # Manhattan distance as heuristic
    heapq.heappush(open_list, start_node)
    
    while open_list:
        current_node = heapq.heappop(open_list)
        
        if current_node.position == goal:
            path = []
            while current_node:
                path.append(current_node.position)
                current_node = current_node.parent
            return path[::-1]  # Return reversed path
        
        closed_list.add(current_node.position)
        
        # Check all 4 possible directions (up, down, left, right)
        neighbors = [(0, 1), (1, 0), (0, -1), (-1, 0)]
        
        for neighbor in neighbors:
            neighbor_pos = (current_node.position[0] + neighbor[0], current_node.position[1] + neighbor[1])
            
            if 0 <= neighbor_pos[0] < len(grid) and 0 <= neighbor_pos[1] < len(grid[0]) and grid[neighbor_pos[0]][neighbor_pos[1]] != 'X' and neighbor_pos not in closed_list:
                g = current_node.g + 1
                h = abs(neighbor_pos[0] - goal[0]) + abs(neighbor_pos[1] - goal[1])
                neighbor_node = Node(neighbor_pos, g, h)
                neighbor_node.parent = current_node
                heapq.heappush(open_list, neighbor_node)

    return None  # No path found

# Example grid and usage
grid = [
    ['S', '1', '1', 'X', '1'],
    ['1', 'X', '1', '1', '1'],
    ['1', '1', '1', 'X', 'G']
]

start = (0, 0)
goal = (2, 4)

path = a_star(grid, start, goal)
print("Path found:", path)
```

**Explanation of the above code:**

### Key Components

1. **Node Class**: Represents a position in the grid with:  
   * position: Coordinates (x, y).  
   * g: Cost from start to this node.  
   * h: Heuristic cost to goal.  
   * f: Total cost (f \= g \+ h).  
   * parent: Tracks the node's parent for path reconstruction.  
2. **a\_star Function**:  
   * **Input**: Grid, start position, goal position.  
   * **Process**:  
     * Initializes a priority queue (open list) with the start node and a closed list to track processed nodes.  
     * Explores neighbors (up, down, left, right) of the current node.  
     * Uses **Manhattan distance** as the heuristic (h).  
     * Adds valid neighbors to the open list, prioritizing nodes with the lowest f value.  
   * **Output**: Shortest path (list of coordinates) or None if no path exists.

## How It Works

* The algorithm pops the node with the lowest f from the open list.  
* If the current node is the goal, it reconstructs the path by backtracking using the parent attribute.  
* Valid neighbors are added to the open list with updated g, h, and f values.

## Heuristics in A\* Search

Heuristics play a very important role in A\* Search Algorithm as it is used to find the estimated cost of reaching the goal from a given node. Accuracy of heuristic is directly related to the optimality of path which A\* finds.
**Generally used heuristics are:**

* **Manhattan Distance**: Used for grid-based pathfinding. Here, the diagonal moves are not allowed.  
* **Euclidean Distance**: It is used for situations where diagonal moves are allowed.  
* **Chebyshev Distance**: Used for grids where the cost of diagonal moves is the same as the cost of horizontal and vertical moves.

## Applications of A\* Search

As we have discussed above that A\* Search Algorithm has many real world applications, such as:

* **Pathfinding in Games**: A\* algorithm is used in Artificial Intelligence Video Games where Non-player characters commonly known as bots find the shortest path throughout the game.  
* **Robotics**: This algorithm also helps robots to navigate through environments simultaneously avoiding obstacles.  
* **GPS Navigation**: To find the best and most efficient route between two points, this algorithm is preferred.  
* **Puzzle Solving**: Puzzles where target is to reach a goal from an initial position such as 8-puzzle or sliding puzzles take help of A\* Search Algorithm.

## Advantages and disadvantages of A\* Search Algorithm

## Advantages

* **Optimal**: This algorithm is optimal in nature as it guarantees the shortest possible path.  
* **Efficient**: It is faster than all other algorithms when appropriate heuristic is used.  
* **Flexible**: The algorithm is available to adapt for various types of graphs and different heuristics.

## Disadvantages

* **Heuristic Dependent**: The performance of this algorithm is heavily dependent on choice of heuristics.  
* **Memory Intensive**: As this algorithm stores all the nodes in memory which is not suitable for large graphs.

## Conclusion

A\* Search Algorithm stands as one of the best algorithms used in artificial intelligence-machine learning. It has an intelligent balance of performance and efficiency. By combining the strengths of Dijkstra’s algorithm and greedy breadth first search, a\* produces optimal results. The key role is heuristics in this algorithm which allows it to calculate the estimated cost and prioritize paths. So whether you are a beginner or a seasoned professional this blog will help you understand the usage and implementation of A\* Search Algorithm.
