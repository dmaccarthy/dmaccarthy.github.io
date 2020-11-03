let childKey = "nodes";

function linkParents(node) {
	var children = node[childKey];
	for (var i=0; i < children.length; i++) {
		var c = children[i];
		c.parent = node;
		if (c[childKey]) linkParents(c);
	}
    return node;
}

function path(node) {
	var p = [];
	while (node) {
		p.push(node);
		node = node.parent;
	}
	p.reverse();
	return p;
}

function nodeText(node) {return node.title ? node.title : node.id}

function hasChildren(node, ph) {
    if (ph && node[childKey] == true) return true;
    return node[childKey] && node[childKey].length;
}

function nextSib(node, n) {
	var p = node.parent;
	if (p) {
		var sibs = p[childKey];
		var i = sibs.indexOf(node) + (n == null ? 1 : n);
		if (i >= 0 && i < sibs.length) return sibs[i];
		return nextSib(p);
	}
}

function nextNode(node, crit) {
    if (crit) {
        crit = _critFn(crit);
        node = nextNode(node);
        while (node && !crit(node)) node = nextNode(node);
        return node;
    }
    else {
        if (hasChildren(node)) return node[childKey][0];
        return nextSib(node);
    }
}

function prevNode(node, crit) {
    crit = _critFn(crit);
    let n = path(node)[0], r = null;
    while (n != node) {
        if (crit(n)) r = n;
        n = nextNode(n);
    }
    return r;
}

function siblings(node, crit) {
// Get a list of siblings that satisfy the criteria
    let sibs = [];
    let par = node.parent;
    if (par) {
        let sibList = par[childKey];
        crit = _critFn(crit);
        for (let i=0;i<sibList.length;i++) {
            let s = sibList[i];
            if (crit(s)) sibs.push(s);
        }
    }
    return sibs;
}

function _critFn(crit) {
    if (typeof(crit) == "string") {
        let attr = crit;
        crit = function(node) {
            return node[attr] != null;
        }
    }
    else if (crit == null) crit = function() {return true}
    return crit;
}

function _nodeMatch(n1, n2) {
	var err;
	if (findNode.ignoreCase) {
		try {return n1.toUpperCase() == n2.toUpperCase()}
		catch(err) {}
	}
	return n1 == n2;
}

function findNode(node, search, page) {
	var k;
	if (typeof(search) == "string")
        search = findNode.allowTitle ?
            {id:search, title:search} : {id:search};
	while (node) {
		if (node[childKey] || !page) {
			for (k in search)
				if (_nodeMatch(node[k], search[k])) return node;
		}
		node = nextNode(node);
	}
}

findNode.ignoreCase = false;
findNode.allowTitle = true;
