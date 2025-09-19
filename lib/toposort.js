function toposort(components) {
  var componentNames = Object.create(null)
  var dependencyGraph = Object.create(null)

  for (var name in components) {
    componentNames[name] = 1
  }

  function collectDependencies(nodes, result) {
    for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i]
      if (node.type === 'element' && componentNames[node.tagName]) {
        result[node.tagName] = 1
      }
      if (node.children && node.children.length > 0) {
        collectDependencies(node.children, result)
      }
    }
  }

  for (var name in components) {
    var deps = Object.create(null)
    collectDependencies(components[name].tree, deps)
    dependencyGraph[name] = Object.keys(deps)
  }

  var sortedNames = kahnSort(dependencyGraph)
  var result = []
  for (var i = 0; i < sortedNames.length; i++) {
    result.push(components[sortedNames[i]])
  }
  return result
}

function kahnSort(graph) {
  var inDegree = Object.create(null)
  var adj = Object.create(null)

  for (var id in graph) {
    inDegree[id] = 0
    adj[id] = []
  }

  for (var id in graph) {
    var deps = graph[id]
    for (var i = 0; i < deps.length; i++) {
      var dep = deps[i]
      if (adj[dep]) {
        adj[dep].push(id)
        inDegree[id]++
      }
    }
  }

  var queue = []
  for (var id in inDegree) {
    if (inDegree[id] === 0) queue.push(id)
  }

  var sorted = []
  while (queue.length > 0) {
    var id = queue.shift()
    sorted.push(id)
    var neighbors = adj[id]
    for (var i = 0; i < neighbors.length; i++) {
      var n = neighbors[i]
      inDegree[n]--
      if (inDegree[n] === 0) queue.push(n)
    }
  }

  if (sorted.length !== Object.keys(graph).length) {
    throw new Error('Circular dependency detected')
  }

  return sorted
}

module.exports = toposort
