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

linkMenus(home);
