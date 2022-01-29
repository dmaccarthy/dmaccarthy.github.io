let lesson_sequence;

function match(a, b, lower) {
    if (a == null) return false;
    return (lower ? a.toLowerCase() == b.toLowerCase() : a == b);
}

function findNode(id, lower) {
    let m = linkMenus.all;
    for (let i=0;i<m.length;i++)
        if (match(m[i].id, id, lower) || match(m[i].title, id, lower))
            return m[i];
}

function linkMenus(node) {
    if (node === home) {
        linkMenus.all = [];
        lesson_sequence = ["."];
    }
    if (node.menu) {
        linkMenus.all.push(node);
        if (window.onMenuLink) onMenuLink(node);
        for (let i=0;i<node.menu.length;i++) {
            let n = node.menu[i];
            n.parent = node;
            linkMenus(n);
        }
    }
    if (node.lesson && node.open) lesson_sequence.push(node.open);
}

function nodePath(node) {
    let path = [];
    while (node) {
        path.push(node);
        node = node.parent;
    }
    path = path.reverse();
    return path;
}

function nextSib(node) {
    if (node.parent) {
        let menu = node.parent.menu;
        let i = menu.indexOf(node) + 1;
        if (i < menu.length) return menu[i];
    }
}

function nextNode(node) {
    if (node.menu && node.menu.length) return node.menu[0];
    if (node.parent) {
        let sib = nextSib(node);
        if (sib) return sib;
        while (node.parent) {
            sib = nextSib(node.parent);
            if (sib) return sib;
            node = node.parent;
        }
    }
}

function nextWith(node, attr) {
    node = nextNode(node);
    while (node) {
        if (node[attr] != null && !node.unavail) return node;
        node = nextNode(node);
    }
}

function* allNodes(node) {
    while (node) {
        yield node;
        node = nextNode(node);
    }
}

function sitemap() {
    let nodes = [];
    for (let node of allNodes(home))
        nodes.push(node);
    return nodes;
}

linkMenus(home);
