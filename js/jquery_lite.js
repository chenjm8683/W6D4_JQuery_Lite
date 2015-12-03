if (typeof $l === 'undefined') {
  window.$l = {};
}
(function() {
  window.$l = function(el) {
    if (el instanceof(HTMLElement)) {
      return new window.DOMNodeCollection([el]);
    } else {
      var elementList = document.querySelectorAll(el);
      var elementListArr = [].slice.apply(elementList);
      return new window.DOMNodeCollection(elementListArr);
    }
  };

  var Dom = window.DOMNodeCollection = function(arr) {
    this.nodes = arr;
  };

  Dom.prototype.html = function (string) {
    if (arguments.length === 0){
      return this.nodes[0].innerHTML;
    } else {
      this.nodes.forEach(function (node) {
        node.innerHTML = string;
      });
    }
  };

  Dom.prototype.empty = function () {
    this.html("");
  };

  Dom.prototype.append = function(obj) {
    if (obj instanceof(window.DOMNodeCollection)) {
      for (var i = 0; i < this.nodes.length; i++){
        for (var j =0; j < obj.nodes.length; j++){
          this.nodes[i].appendChild(obj.nodes[j]);
        }
      }
    } else if (typeof obj === "string") {
      this.nodes.forEach(function (node) {
        node.innerHTML += obj;
      });
    } else {
      this.nodes.forEach(function (node) {
        node.innerHTML += obj.innerHTML;
      });
    }
  };

  Dom.prototype.attr = function(attributeName, value) {
    if (value === 'undefined') {
      for (var i = 0; i < this.nodes.length; i++) {
        var result = this.nodes[i].attributes[attributeName];
        if (result !== 'undefined') {
          return result;
        }
      }
    } else {
      for (var i = 0; i < this.nodes.length; i++) {
        var result = this.nodes[i].attributes[attributeName];
        if (result !== 'undefined') {
          this.nodes[i].attributes[attributeName] = value;
          return;
        }
      }
    }
  };

  Dom.prototype.addClass = function (newClassName) {
    this.nodes.forEach(function (node) {
      // node.className += " " + newClassName;
      var classArr = node.className.split(" ");
      if (classArr.indexOf(newClassName) === -1) {
        classArr.push(newClassName);
        node.className = classArr.join(" ");
      }
    });
  };

  Dom.prototype.removeClass = function (removeClassName) {
    this.nodes.forEach(function (node) {
      node.className.replace(removeClassName, "");
    });
  };

  Dom.prototype.children = function () {
    var childNodes = [];
    this.nodes.forEach( function(node) {
      var childrenArr = [].slice.apply(node.children);
      childNodes = childNodes.concat(childrenArr);
    });
    return new Dom(childNodes);
  };

  Dom.prototype.parent = function () {
    var parentNodes = [];
    this.nodes.forEach( function(node) {
      var pNode = node.parentNode;
      if (parentNodes.indexOf(pNode) === -1) {
        parentNodes.push(pNode);
      }
    });
    return new Dom(parentNodes);
  };

  Dom.prototype.find = function(selector) {
    var resultArr = [];
    this.nodes.forEach(function(node) {
      var result = [].slice.apply(node.querySelectorAll(selector));
      resultArr = resultArr.concat(result);
    });
    return new Dom(resultArr);
  };

  Dom.prototype.remove = function() {
    this.nodes.forEach(function(node) {
      node.remove();
    });
  };

  Dom.prototype.on = function (e, selector, handler) {
    var targetNodes = this.find(selector).nodes;

    targetNodes.forEach(function(node) {
      node.addEventListener(e, handler);
    });
  };

  Dom.prototype.off = function (e, selector, handler) {
    var targetNodes = this.find(selector).nodes;

    targetNodes.forEach(function(node) {
      node.removeEventListener(e, handler);
    });
  };





})();
