function allNodes(node, parent) {
// Link parents and return an ordered list of nodes
	if (parent) node.parent = parent;
	let nodeList = [node];
	let children = node.nodes;
	if (children) for (let i=0;i<children.length;i++) {
		nodeList = nodeList.concat(allNodes(children[i], node));
	}
	return nodeList;
}

function nextNode(n, node) {
    let a = allNodes(node ? node : home);
    if (n == null) n = 1;
    n += a.indexOf($("li.Current")[0].node);
    return a[n];
}

function findNode(root, crit) {
	if (typeof(crit) == "string") {
		let id = crit;
		crit = function(n) {
            return n.id == id || n.title == id;
        };
	}
	let nodes = allNodes(root);
	for (let i=0;i<nodes.length;i++) {
		let n = nodes[i];
		if (crit(n)) return n;
	} 
}

function toggle(e) {
	let li = $(this).parent().toggleClass("Collapsed");
}

function expand(level, li) {
	li = li ? $(li) : $("ul.Tree > li.Expand");
    li.closest("ul.Tree").find("li.Expand").addClass("Collapsed");
	if (level == true) li.removeClass("Collapsed").find("*").removeClass("Collapsed");
	else if (level) {
		li.removeClass("Collapsed");
		expand(level - 1, li.find("> ul > li.Expand"));
	}
}

function expandOnly(li) {
	expand(0);
	li = $(li);
	li.closest("ul.Tree").find("li"); //.addClass("Hidden");
	while (li.length) {
		li.removeClass("Collapsed"); // Hidden
		li = li.parent().closest("li.Expand");
	}
}

function treeLI(obj) {
	let span = $("<span>").html(obj.title).addClass("Action");
	let li = $("<li>").append(span);
	li[0].node = obj;
	obj.li = li[0];
	let n = obj.nodes;
	if (n) {
		n = n.length;
		if (n) {
			span.addClass("Toggle");
			let ul = $("<ul>").appendTo(li.addClass("Expand"));
			for (let i=0;i<n;i++)
				ul.append(treeLI(obj.nodes[i]));
		}
	}
	return li;
}

function initTreeUL(ul, action) {
	if (!action) action = function(n) {setCurrent(n.li)};
	ul = $(ul);
	let li = ul.find("li.Expand").addClass("Collapsed");
	li.children("span.Toggle").click(toggle);
	ul.find("span.Action").click(function(e) {
		let node = $(e.currentTarget).parent()[0].node;
		action(node);
	});
}

function setCurrent(node) {
    $(".Current").removeClass("Current");
    $(node).addClass("Current");
}
