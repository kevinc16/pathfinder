# Pathfinding Visualizer

An interactive browser-based visualizer for exploring how common pathfinding algorithms traverse a grid and discover a route between two points.

## Features

- Visualizes each algorithm's search process step by step
- Supports drawing and removing walls
- Lets you reposition the start and destination nodes
- Animates the final route when a path is found
- Includes controls for clearing the search or removing all walls

## Algorithms

- **Breadth-first search (BFS)** — explores the grid level by level and finds a shortest path on an unweighted grid
- **Depth-first search (DFS)** — explores one branch at a time and does not guarantee a shortest path
- **Dijkstra's algorithm** — finds a shortest path by expanding the lowest-cost node first
- **A\* search** — uses a heuristic to guide the search toward the destination

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/)
- npm

### Installation

```bash
git clone git@github.com:kevinc16/pathfinder.git
cd pathfinder
npm install
npm start
```

The development server serves the application from the `dist` directory and rebuilds the JavaScript and SCSS source through webpack.

## How to use

1. Choose an algorithm from the navigation menu.
2. Click or left-click and drag across the grid to add walls.
3. Right-click or right-click and drag to remove walls.
4. Drag the start or destination node to reposition it.
5. Select **Start** to run the visualization.

Use **Clear Board** to remove the current visualization while preserving walls, or **Clear Walls** to remove every wall.

## Available scripts

```bash
npm start       # Start the webpack development server
npm run build   # Create a production bundle
npm run deploy  # Publish the dist directory with gh-pages
```

## Project structure

```text
pathfinder/
├── dist/                  # Static page and generated bundle
├── src/js/algorithms/     # Pathfinding implementations
├── src/js/                # Grid interactions and shared utilities
├── src/scss/              # Application styles
└── webpack.config.js      # Build configuration
```

## Inspiration

Inspired by [Clement Mihailescu's Pathfinding Visualizer](https://github.com/clementmihailescu/Pathfinding-Visualizer) and [Jefferson Li's Pathfinder](https://github.com/Jeffersonlii/Pathfinder).
