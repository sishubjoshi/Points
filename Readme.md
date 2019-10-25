# Points
[![Netlify Status](https://api.netlify.com/api/v1/badges/361d60e0-635d-4e3f-b1df-01e9337e924c/deploy-status)](https://app.netlify.com/sites/modest-hypatia-c57da4/deploys)

## Kruskal's Algorithm using HTML Canvas

> Algorithm is in Python and App uses a POST request to the Flask api.
# Algorithm
The algorithm is a Greedy Algorithm. The Greedy Choice is to pick the smallest weight edge that does not cause a cycle in the MST constructed so far.

Below are the steps for finding MST using Kruskal’s algorithm:
1. Sort all the edges in non-decreasing order of their weight.
2. Pick the smallest edge. Check if it forms a cycle with the spanning tree formed so far. If cycle is not formed, include this edge. Else, discard it.
3. Repeat step#2 until there are (V-1) edges in the spanning tree.
