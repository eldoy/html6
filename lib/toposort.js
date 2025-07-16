function toposort(templates) {
  var dependencyGraph = new Map()
  var allTemplateNames = new Set(Object.keys(templates))

  function findDependenciesInTree(nodes, knownNames) {
    var dependencies = []
    for (var node of nodes) {
      if (node.type == 'element' && knownNames.has(node.tagName)) {
        dependencies.push(node.tagName)
      }
      if (node.children && node.children.length > 0) {
        dependencies = dependencies.concat(
          findDependenciesInTree(node.children, knownNames)
        )
      }
    }
    return [...new Set(dependencies)]
  }

  for (var name in templates) {
    var templateData = templates[name]
    var dependencies = findDependenciesInTree(
      templateData.tree,
      allTemplateNames
    )
    dependencyGraph.set(name, dependencies)
  }

  var sortedNames = kahnTopologicalSort(dependencyGraph)

  return sortedNames.map((name) => templates[name])
}

function kahnTopologicalSort(graph) {
  var inDegree = new Map()
  var adjList = new Map()

  for (var id of graph.keys()) {
    inDegree.set(id, 0)
    adjList.set(id, [])
  }

  for (var [id, dependencies] of graph.entries()) {
    for (var depId of dependencies) {
      if (adjList.has(depId)) {
        adjList.get(depId).push(id)
        inDegree.set(id, inDegree.get(id) + 1)
      }
    }
  }

  var queue = []
  for (var [id, degree] of inDegree.entries()) {
    if (degree == 0) {
      queue.push(id)
    }
  }

  var sortedOrder = []
  while (queue.length > 0) {
    var id = queue.shift()
    sortedOrder.push(id)

    if (adjList.has(id)) {
      for (var neighborId of adjList.get(id)) {
        inDegree.set(neighborId, inDegree.get(neighborId) - 1)
        if (inDegree.get(neighborId) == 0) {
          queue.push(neighborId)
        }
      }
    }
  }

  if (sortedOrder.length != graph.size) {
    throw new Error('A circular dependency was detected in the templates.')
  }

  return sortedOrder
}

module.exports = toposort
