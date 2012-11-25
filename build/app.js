
// minifier: path aliases

enyo.path.addPaths({layout: "/var/lib/stickshift/3d70d9449be149908b03b9e7673427c2/app-root/data/294080/enyo/tools/../../lib/layout/", onyx: "/var/lib/stickshift/3d70d9449be149908b03b9e7673427c2/app-root/data/294080/enyo/tools/../../lib/onyx/", onyx: "/var/lib/stickshift/3d70d9449be149908b03b9e7673427c2/app-root/data/294080/enyo/tools/../../lib/onyx/source/", canvas: "/var/lib/stickshift/3d70d9449be149908b03b9e7673427c2/app-root/data/294080/enyo/tools/../../lib/canvas/"});

// FittableLayout.js

enyo.kind({
name: "enyo.FittableLayout",
kind: "Layout",
calcFitIndex: function() {
for (var e = 0, t = this.container.children, n; n = t[e]; e++) if (n.fit && n.showing) return e;
},
getFitControl: function() {
var e = this.container.children, t = e[this.fitIndex];
return t && t.fit && t.showing || (this.fitIndex = this.calcFitIndex(), t = e[this.fitIndex]), t;
},
getLastControl: function() {
var e = this.container.children, t = e.length - 1, n = e[t];
while ((n = e[t]) && !n.showing) t--;
return n;
},
_reflow: function(e, t, n, r) {
this.container.addRemoveClass("enyo-stretch", !this.container.noStretch);
var i = this.getFitControl();
if (!i) return;
var s = 0, o = 0, u = 0, a, f = this.container.hasNode();
f && (a = enyo.dom.calcPaddingExtents(f), s = f[t] - (a[n] + a[r]));
var l = i.getBounds();
o = l[n] - (a && a[n] || 0);
var c = this.getLastControl();
if (c) {
var h = enyo.dom.getComputedBoxValue(c.hasNode(), "margin", r) || 0;
if (c != i) {
var p = c.getBounds(), d = l[n] + l[e], v = p[n] + p[e] + h;
u = v - d;
} else u = h;
}
var m = s - (o + u);
i.applyStyle(e, m + "px");
},
reflow: function() {
this.orient == "h" ? this._reflow("width", "clientWidth", "left", "right") : this._reflow("height", "clientHeight", "top", "bottom");
}
}), enyo.kind({
name: "enyo.FittableColumnsLayout",
kind: "FittableLayout",
orient: "h",
layoutClass: "enyo-fittable-columns-layout"
}), enyo.kind({
name: "enyo.FittableRowsLayout",
kind: "FittableLayout",
layoutClass: "enyo-fittable-rows-layout",
orient: "v"
});

// FittableRows.js

enyo.kind({
name: "enyo.FittableRows",
layoutKind: "FittableRowsLayout",
noStretch: !1
});

// FittableColumns.js

enyo.kind({
name: "enyo.FittableColumns",
layoutKind: "FittableColumnsLayout",
noStretch: !1
});

// FlyweightRepeater.js

enyo.kind({
name: "enyo.FlyweightRepeater",
published: {
count: 0,
multiSelect: !1,
toggleSelected: !1,
clientClasses: "",
clientStyle: ""
},
events: {
onSetupItem: ""
},
components: [ {
kind: "Selection",
onSelect: "selectDeselect",
onDeselect: "selectDeselect"
}, {
name: "client"
} ],
rowOffset: 0,
bottomUp: !1,
create: function() {
this.inherited(arguments), this.multiSelectChanged(), this.clientClassesChanged(), this.clientStyleChanged();
},
multiSelectChanged: function() {
this.$.selection.setMulti(this.multiSelect);
},
clientClassesChanged: function() {
this.$.client.setClasses(this.clientClasses);
},
clientStyleChanged: function() {
this.$.client.setStyle(this.clientStyle);
},
setupItem: function(e) {
this.doSetupItem({
index: e,
selected: this.isSelected(e)
});
},
generateChildHtml: function() {
var e = "";
this.index = null;
for (var t = 0, n = 0; t < this.count; t++) n = this.rowOffset + (this.bottomUp ? this.count - t - 1 : t), this.setupItem(n), this.$.client.setAttribute("index", n), e += this.inherited(arguments), this.$.client.teardownRender();
return e;
},
previewDomEvent: function(e) {
var t = this.index = this.rowForEvent(e);
e.rowIndex = e.index = t, e.flyweight = this;
},
decorateEvent: function(e, t, n) {
var r = t && t.index != null ? t.index : this.index;
t && r != null && (t.index = r, t.flyweight = this), this.inherited(arguments);
},
tap: function(e, t) {
this.toggleSelected ? this.$.selection.toggle(t.index) : this.$.selection.select(t.index);
},
selectDeselect: function(e, t) {
this.renderRow(t.key);
},
getSelection: function() {
return this.$.selection;
},
isSelected: function(e) {
return this.getSelection().isSelected(e);
},
renderRow: function(e) {
var t = this.fetchRowNode(e);
t && (this.setupItem(e), t.innerHTML = this.$.client.generateChildHtml(), this.$.client.teardownChildren());
},
fetchRowNode: function(e) {
if (this.hasNode()) {
var t = this.node.querySelectorAll('[index="' + e + '"]');
return t && t[0];
}
},
rowForEvent: function(e) {
var t = e.target, n = this.hasNode().id;
while (t && t.parentNode && t.id != n) {
var r = t.getAttribute && t.getAttribute("index");
if (r !== null) return Number(r);
t = t.parentNode;
}
return -1;
},
prepareRow: function(e) {
var t = this.fetchRowNode(e);
enyo.FlyweightRepeater.claimNode(this.$.client, t);
},
lockRow: function() {
this.$.client.teardownChildren();
},
performOnRow: function(e, t, n) {
t && (this.prepareRow(e), enyo.call(n || null, t), this.lockRow());
},
statics: {
claimNode: function(e, t) {
var n = t && t.querySelectorAll("#" + e.id);
n = n && n[0], e.generated = Boolean(n || !e.tag), e.node = n, e.node && e.rendered();
for (var r = 0, i = e.children, s; s = i[r]; r++) this.claimNode(s, t);
}
}
});

// List.js

enyo.kind({
name: "enyo.List",
kind: "Scroller",
classes: "enyo-list",
published: {
count: 0,
rowsPerPage: 50,
bottomUp: !1,
multiSelect: !1,
toggleSelected: !1,
fixedHeight: !1
},
events: {
onSetupItem: ""
},
handlers: {
onAnimateFinish: "animateFinish"
},
rowHeight: 0,
listTools: [ {
name: "port",
classes: "enyo-list-port enyo-border-box",
components: [ {
name: "generator",
kind: "FlyweightRepeater",
canGenerate: !1,
components: [ {
tag: null,
name: "client"
} ]
}, {
name: "page0",
allowHtml: !0,
classes: "enyo-list-page"
}, {
name: "page1",
allowHtml: !0,
classes: "enyo-list-page"
} ]
} ],
create: function() {
this.pageHeights = [], this.inherited(arguments), this.getStrategy().translateOptimized = !0, this.bottomUpChanged(), this.multiSelectChanged(), this.toggleSelectedChanged();
},
createStrategy: function() {
this.controlParentName = "strategy", this.inherited(arguments), this.createChrome(this.listTools), this.controlParentName = "client", this.discoverControlParent();
},
rendered: function() {
this.inherited(arguments), this.$.generator.node = this.$.port.hasNode(), this.$.generator.generated = !0, this.reset();
},
resizeHandler: function() {
this.inherited(arguments), this.refresh();
},
bottomUpChanged: function() {
this.$.generator.bottomUp = this.bottomUp, this.$.page0.applyStyle(this.pageBound, null), this.$.page1.applyStyle(this.pageBound, null), this.pageBound = this.bottomUp ? "bottom" : "top", this.hasNode() && this.reset();
},
multiSelectChanged: function() {
this.$.generator.setMultiSelect(this.multiSelect);
},
toggleSelectedChanged: function() {
this.$.generator.setToggleSelected(this.toggleSelected);
},
countChanged: function() {
this.hasNode() && this.updateMetrics();
},
updateMetrics: function() {
this.defaultPageHeight = this.rowsPerPage * (this.rowHeight || 100), this.pageCount = Math.ceil(this.count / this.rowsPerPage), this.portSize = 0;
for (var e = 0; e < this.pageCount; e++) this.portSize += this.getPageHeight(e);
this.adjustPortSize();
},
generatePage: function(e, t) {
this.page = e;
var n = this.$.generator.rowOffset = this.rowsPerPage * this.page, r = this.$.generator.count = Math.min(this.count - n, this.rowsPerPage), i = this.$.generator.generateChildHtml();
t.setContent(i);
var s = t.getBounds().height;
!this.rowHeight && s > 0 && (this.rowHeight = Math.floor(s / r), this.updateMetrics());
if (!this.fixedHeight) {
var o = this.getPageHeight(e);
o != s && s > 0 && (this.pageHeights[e] = s, this.portSize += s - o);
}
},
update: function(e) {
var t = !1, n = this.positionToPageInfo(e), r = n.pos + this.scrollerHeight / 2, i = Math.floor(r / Math.max(n.height, this.scrollerHeight) + .5) + n.no, s = i % 2 == 0 ? i : i - 1;
this.p0 != s && this.isPageInRange(s) && (this.generatePage(s, this.$.page0), this.positionPage(s, this.$.page0), this.p0 = s, t = !0), s = i % 2 == 0 ? Math.max(1, i - 1) : i, this.p1 != s && this.isPageInRange(s) && (this.generatePage(s, this.$.page1), this.positionPage(s, this.$.page1), this.p1 = s, t = !0), t && !this.fixedHeight && (this.adjustBottomPage(), this.adjustPortSize());
},
updateForPosition: function(e) {
this.update(this.calcPos(e));
},
calcPos: function(e) {
return this.bottomUp ? this.portSize - this.scrollerHeight - e : e;
},
adjustBottomPage: function() {
var e = this.p0 >= this.p1 ? this.$.page0 : this.$.page1;
this.positionPage(e.pageNo, e);
},
adjustPortSize: function() {
this.scrollerHeight = this.getBounds().height;
var e = Math.max(this.scrollerHeight, this.portSize);
this.$.port.applyStyle("height", e + "px");
},
positionPage: function(e, t) {
t.pageNo = e;
var n = this.pageToPosition(e);
t.applyStyle(this.pageBound, n + "px");
},
pageToPosition: function(e) {
var t = 0, n = e;
while (n > 0) n--, t += this.getPageHeight(n);
return t;
},
positionToPageInfo: function(e) {
var t = -1, n = this.calcPos(e), r = this.defaultPageHeight;
while (n >= 0) t++, r = this.getPageHeight(t), n -= r;
return {
no: t,
height: r,
pos: n + r
};
},
isPageInRange: function(e) {
return e == Math.max(0, Math.min(this.pageCount - 1, e));
},
getPageHeight: function(e) {
return this.pageHeights[e] || this.defaultPageHeight;
},
invalidatePages: function() {
this.p0 = this.p1 = null, this.$.page0.setContent(""), this.$.page1.setContent("");
},
invalidateMetrics: function() {
this.pageHeights = [], this.rowHeight = 0, this.updateMetrics();
},
scroll: function(e, t) {
var n = this.inherited(arguments);
return this.update(this.getScrollTop()), n;
},
scrollToBottom: function() {
this.update(this.getScrollBounds().maxTop), this.inherited(arguments);
},
setScrollTop: function(e) {
this.update(e), this.inherited(arguments), this.twiddle();
},
getScrollPosition: function() {
return this.calcPos(this.getScrollTop());
},
setScrollPosition: function(e) {
this.setScrollTop(this.calcPos(e));
},
scrollToRow: function(e) {
var t = Math.floor(e / this.rowsPerPage), n = e % this.rowsPerPage, r = this.pageToPosition(t);
this.updateForPosition(r), r = this.pageToPosition(t), this.setScrollPosition(r);
if (t == this.p0 || t == this.p1) {
var i = this.$.generator.fetchRowNode(e);
if (i) {
var s = i.offsetTop;
this.bottomUp && (s = this.getPageHeight(t) - i.offsetHeight - s);
var o = this.getScrollPosition() + s;
this.setScrollPosition(o);
}
}
},
scrollToStart: function() {
this[this.bottomUp ? "scrollToBottom" : "scrollToTop"]();
},
scrollToEnd: function() {
this[this.bottomUp ? "scrollToTop" : "scrollToBottom"]();
},
refresh: function() {
this.invalidatePages(), this.update(this.getScrollTop()), this.stabilize(), enyo.platform.android === 4 && this.twiddle();
},
reset: function() {
this.getSelection().clear(), this.invalidateMetrics(), this.invalidatePages(), this.stabilize(), this.scrollToStart();
},
getSelection: function() {
return this.$.generator.getSelection();
},
select: function(e, t) {
return this.getSelection().select(e, t);
},
isSelected: function(e) {
return this.$.generator.isSelected(e);
},
renderRow: function(e) {
this.$.generator.renderRow(e);
},
prepareRow: function(e) {
this.$.generator.prepareRow(e);
},
lockRow: function() {
this.$.generator.lockRow();
},
performOnRow: function(e, t, n) {
this.$.generator.performOnRow(e, t, n);
},
animateFinish: function(e) {
return this.twiddle(), !0;
},
twiddle: function() {
var e = this.getStrategy();
enyo.call(e, "twiddle");
}
});

// PulldownList.js

enyo.kind({
name: "enyo.PulldownList",
kind: "List",
touch: !0,
pully: null,
pulldownTools: [ {
name: "pulldown",
classes: "enyo-list-pulldown",
components: [ {
name: "puller",
kind: "Puller"
} ]
} ],
events: {
onPullStart: "",
onPullCancel: "",
onPull: "",
onPullRelease: "",
onPullComplete: ""
},
handlers: {
onScrollStart: "scrollStartHandler",
onScrollStop: "scrollStopHandler",
ondragfinish: "dragfinish"
},
pullingMessage: "Pull down to refresh...",
pulledMessage: "Release to refresh...",
loadingMessage: "Loading...",
pullingIconClass: "enyo-puller-arrow enyo-puller-arrow-down",
pulledIconClass: "enyo-puller-arrow enyo-puller-arrow-up",
loadingIconClass: "",
create: function() {
var e = {
kind: "Puller",
showing: !1,
text: this.loadingMessage,
iconClass: this.loadingIconClass,
onCreate: "setPully"
};
this.listTools.splice(0, 0, e), this.inherited(arguments), this.setPulling();
},
initComponents: function() {
this.createChrome(this.pulldownTools), this.accel = enyo.dom.canAccelerate(), this.translation = this.accel ? "translate3d" : "translate", this.inherited(arguments);
},
setPully: function(e, t) {
this.pully = t.originator;
},
scrollStartHandler: function() {
this.firedPullStart = !1, this.firedPull = !1, this.firedPullCancel = !1;
},
scroll: function(e, t) {
var n = this.inherited(arguments);
this.completingPull && this.pully.setShowing(!1);
var r = this.getStrategy().$.scrollMath, i = r.y;
return r.isInOverScroll() && i > 0 && (enyo.dom.transformValue(this.$.pulldown, this.translation, "0," + i + "px" + (this.accel ? ",0" : "")), this.firedPullStart || (this.firedPullStart = !0, this.pullStart(), this.pullHeight = this.$.pulldown.getBounds().height), i > this.pullHeight && !this.firedPull && (this.firedPull = !0, this.firedPullCancel = !1, this.pull()), this.firedPull && !this.firedPullCancel && i < this.pullHeight && (this.firedPullCancel = !0, this.firedPull = !1, this.pullCancel())), n;
},
scrollStopHandler: function() {
this.completingPull && (this.completingPull = !1, this.doPullComplete());
},
dragfinish: function() {
if (this.firedPull) {
var e = this.getStrategy().$.scrollMath;
e.setScrollY(e.y - this.pullHeight), this.pullRelease();
}
},
completePull: function() {
this.completingPull = !0, this.$.strategy.$.scrollMath.setScrollY(this.pullHeight), this.$.strategy.$.scrollMath.start();
},
pullStart: function() {
this.setPulling(), this.pully.setShowing(!1), this.$.puller.setShowing(!0), this.doPullStart();
},
pull: function() {
this.setPulled(), this.doPull();
},
pullCancel: function() {
this.setPulling(), this.doPullCancel();
},
pullRelease: function() {
this.$.puller.setShowing(!1), this.pully.setShowing(!0), this.doPullRelease();
},
setPulling: function() {
this.$.puller.setText(this.pullingMessage), this.$.puller.setIconClass(this.pullingIconClass);
},
setPulled: function() {
this.$.puller.setText(this.pulledMessage), this.$.puller.setIconClass(this.pulledIconClass);
}
}), enyo.kind({
name: "enyo.Puller",
classes: "enyo-puller",
published: {
text: "",
iconClass: ""
},
events: {
onCreate: ""
},
components: [ {
name: "icon"
}, {
name: "text",
tag: "span",
classes: "enyo-puller-text"
} ],
create: function() {
this.inherited(arguments), this.doCreate(), this.textChanged(), this.iconClassChanged();
},
textChanged: function() {
this.$.text.setContent(this.text);
},
iconClassChanged: function() {
this.$.icon.setClasses(this.iconClass);
}
});

// Slideable.js

enyo.kind({
name: "enyo.Slideable",
kind: "Control",
published: {
axis: "h",
value: 0,
unit: "px",
min: 0,
max: 0,
accelerated: "auto",
overMoving: !0,
draggable: !0
},
events: {
onAnimateFinish: "",
onChange: ""
},
preventDragPropagation: !1,
tools: [ {
kind: "Animator",
onStep: "animatorStep",
onEnd: "animatorComplete"
} ],
handlers: {
ondragstart: "dragstart",
ondrag: "drag",
ondragfinish: "dragfinish"
},
kDragScalar: 1,
dragEventProp: "dx",
unitModifier: !1,
canTransform: !1,
create: function() {
this.inherited(arguments), this.acceleratedChanged(), this.transformChanged(), this.axisChanged(), this.valueChanged(), this.addClass("enyo-slideable");
},
initComponents: function() {
this.createComponents(this.tools), this.inherited(arguments);
},
rendered: function() {
this.inherited(arguments), this.canModifyUnit(), this.updateDragScalar();
},
resizeHandler: function() {
this.inherited(arguments), this.updateDragScalar();
},
canModifyUnit: function() {
if (!this.canTransform) {
var e = this.getInitialStyleValue(this.hasNode(), this.boundary);
e.match(/px/i) && this.unit === "%" && (this.unitModifier = this.getBounds()[this.dimension]);
}
},
getInitialStyleValue: function(e, t) {
var n = enyo.dom.getComputedStyle(e);
return n ? n.getPropertyValue(t) : e && e.currentStyle ? e.currentStyle[t] : "0";
},
updateBounds: function(e, t) {
var n = {};
n[this.boundary] = e, this.setBounds(n, this.unit), this.setInlineStyles(e, t);
},
updateDragScalar: function() {
if (this.unit == "%") {
var e = this.getBounds()[this.dimension];
this.kDragScalar = e ? 100 / e : 1, this.canTransform || this.updateBounds(this.value, 100);
}
},
transformChanged: function() {
this.canTransform = enyo.dom.canTransform();
},
acceleratedChanged: function() {
enyo.platform.android > 2 || enyo.dom.accelerate(this, this.accelerated);
},
axisChanged: function() {
var e = this.axis == "h";
this.dragMoveProp = e ? "dx" : "dy", this.shouldDragProp = e ? "horizontal" : "vertical", this.transform = e ? "translateX" : "translateY", this.dimension = e ? "width" : "height", this.boundary = e ? "left" : "top";
},
setInlineStyles: function(e, t) {
var n = {};
this.unitModifier ? (n[this.boundary] = this.percentToPixels(e, this.unitModifier), n[this.dimension] = this.unitModifier, this.setBounds(n)) : (t ? n[this.dimension] = t : n[this.boundary] = e, this.setBounds(n, this.unit));
},
valueChanged: function(e) {
var t = this.value;
this.isOob(t) && !this.isAnimating() && (this.value = this.overMoving ? this.dampValue(t) : this.clampValue(t)), enyo.platform.android > 2 && (this.value ? (e === 0 || e === undefined) && enyo.dom.accelerate(this, this.accelerated) : enyo.dom.accelerate(this, !1)), this.canTransform ? enyo.dom.transformValue(this, this.transform, this.value + this.unit) : this.setInlineStyles(this.value, !1), this.doChange();
},
getAnimator: function() {
return this.$.animator;
},
isAtMin: function() {
return this.value <= this.calcMin();
},
isAtMax: function() {
return this.value >= this.calcMax();
},
calcMin: function() {
return this.min;
},
calcMax: function() {
return this.max;
},
clampValue: function(e) {
var t = this.calcMin(), n = this.calcMax();
return Math.max(t, Math.min(e, n));
},
dampValue: function(e) {
return this.dampBound(this.dampBound(e, this.min, 1), this.max, -1);
},
dampBound: function(e, t, n) {
var r = e;
return r * n < t * n && (r = t + (r - t) / 4), r;
},
percentToPixels: function(e, t) {
return Math.floor(t / 100 * e);
},
pixelsToPercent: function(e) {
var t = this.unitModifier ? this.getBounds()[this.dimension] : this.container.getBounds()[this.dimension];
return e / t * 100;
},
shouldDrag: function(e) {
return this.draggable && e[this.shouldDragProp];
},
isOob: function(e) {
return e > this.calcMax() || e < this.calcMin();
},
dragstart: function(e, t) {
if (this.shouldDrag(t)) return t.preventDefault(), this.$.animator.stop(), t.dragInfo = {}, this.dragging = !0, this.drag0 = this.value, this.dragd0 = 0, this.preventDragPropagation;
},
drag: function(e, t) {
if (this.dragging) {
t.preventDefault();
var n = this.canTransform ? t[this.dragMoveProp] * this.kDragScalar : this.pixelsToPercent(t[this.dragMoveProp]), r = this.drag0 + n, i = n - this.dragd0;
return this.dragd0 = n, i && (t.dragInfo.minimizing = i < 0), this.setValue(r), this.preventDragPropagation;
}
},
dragfinish: function(e, t) {
if (this.dragging) return this.dragging = !1, this.completeDrag(t), t.preventTap(), this.preventDragPropagation;
},
completeDrag: function(e) {
this.value !== this.calcMax() && this.value != this.calcMin() && this.animateToMinMax(e.dragInfo.minimizing);
},
isAnimating: function() {
return this.$.animator.isAnimating();
},
play: function(e, t) {
this.$.animator.play({
startValue: e,
endValue: t,
node: this.hasNode()
});
},
animateTo: function(e) {
this.play(this.value, e);
},
animateToMin: function() {
this.animateTo(this.calcMin());
},
animateToMax: function() {
this.animateTo(this.calcMax());
},
animateToMinMax: function(e) {
e ? this.animateToMin() : this.animateToMax();
},
animatorStep: function(e) {
return this.setValue(e.value), !0;
},
animatorComplete: function(e) {
return this.doAnimateFinish(e), !0;
},
toggleMinMax: function() {
this.animateToMinMax(!this.isAtMin());
}
});

// Arranger.js

enyo.kind({
name: "enyo.Arranger",
kind: "Layout",
layoutClass: "enyo-arranger",
accelerated: "auto",
dragProp: "ddx",
dragDirectionProp: "xDirection",
canDragProp: "horizontal",
incrementalPoints: !1,
destroy: function() {
var e = this.container.getPanels();
for (var t = 0, n; n = e[t]; t++) n._arranger = null;
this.inherited(arguments);
},
arrange: function(e, t) {},
size: function() {},
start: function() {
var e = this.container.fromIndex, t = this.container.toIndex, n = this.container.transitionPoints = [ e ];
if (this.incrementalPoints) {
var r = Math.abs(t - e) - 2, i = e;
while (r >= 0) i += t < e ? -1 : 1, n.push(i), r--;
}
n.push(this.container.toIndex);
},
finish: function() {},
canDragEvent: function(e) {
return e[this.canDragProp];
},
calcDragDirection: function(e) {
return e[this.dragDirectionProp];
},
calcDrag: function(e) {
return e[this.dragProp];
},
drag: function(e, t, n, r, i) {
var s = this.measureArrangementDelta(-e, t, n, r, i);
return s;
},
measureArrangementDelta: function(e, t, n, r, i) {
var s = this.calcArrangementDifference(t, n, r, i), o = s ? e / Math.abs(s) : 0;
return o *= this.container.fromIndex > this.container.toIndex ? -1 : 1, o;
},
calcArrangementDifference: function(e, t, n, r) {},
_arrange: function(e) {
this.containerBounds || this.reflow();
var t = this.getOrderedControls(e);
this.arrange(t, e);
},
arrangeControl: function(e, t) {
e._arranger = enyo.mixin(e._arranger || {}, t);
},
flow: function() {
this.c$ = [].concat(this.container.getPanels()), this.controlsIndex = 0;
for (var e = 0, t = this.container.getPanels(), n; n = t[e]; e++) {
enyo.dom.accelerate(n, this.accelerated);
if (enyo.platform.safari) {
var r = n.children;
for (var i = 0, s; s = r[i]; i++) enyo.dom.accelerate(s, this.accelerated);
}
}
},
reflow: function() {
var e = this.container.hasNode();
this.containerBounds = e ? {
width: e.clientWidth,
height: e.clientHeight
} : {}, this.size();
},
flowArrangement: function() {
var e = this.container.arrangement;
if (e) for (var t = 0, n = this.container.getPanels(), r; r = n[t]; t++) this.flowControl(r, e[t]);
},
flowControl: function(e, t) {
enyo.Arranger.positionControl(e, t);
var n = t.opacity;
n != null && enyo.Arranger.opacifyControl(e, n);
},
getOrderedControls: function(e) {
var t = Math.floor(e), n = t - this.controlsIndex, r = n > 0, i = this.c$ || [];
for (var s = 0; s < Math.abs(n); s++) r ? i.push(i.shift()) : i.unshift(i.pop());
return this.controlsIndex = t, i;
},
statics: {
positionControl: function(e, t, n) {
var r = n || "px";
if (!this.updating) if (enyo.dom.canTransform() && !enyo.platform.android) {
var i = t.left, s = t.top, i = enyo.isString(i) ? i : i && i + r, s = enyo.isString(s) ? s : s && s + r;
enyo.dom.transform(e, {
translateX: i || null,
translateY: s || null
});
} else e.setBounds(t, n);
},
opacifyControl: function(e, t) {
var n = t;
n = n > .99 ? 1 : n < .01 ? 0 : n, enyo.platform.ie < 9 ? e.applyStyle("filter", "progid:DXImageTransform.Microsoft.Alpha(Opacity=" + n * 100 + ")") : e.applyStyle("opacity", n);
}
}
});

// CardArranger.js

enyo.kind({
name: "enyo.CardArranger",
kind: "Arranger",
layoutClass: "enyo-arranger enyo-arranger-fit",
calcArrangementDifference: function(e, t, n, r) {
return this.containerBounds.width;
},
arrange: function(e, t) {
for (var n = 0, r, i, s; r = e[n]; n++) s = n == 0 ? 1 : 0, this.arrangeControl(r, {
opacity: s
});
},
start: function() {
this.inherited(arguments);
var e = this.container.getPanels();
for (var t = 0, n; n = e[t]; t++) {
var r = n.showing;
n.setShowing(t == this.container.fromIndex || t == this.container.toIndex), n.showing && !r && n.resized();
}
},
finish: function() {
this.inherited(arguments);
var e = this.container.getPanels();
for (var t = 0, n; n = e[t]; t++) n.setShowing(t == this.container.toIndex);
},
destroy: function() {
var e = this.container.getPanels();
for (var t = 0, n; n = e[t]; t++) enyo.Arranger.opacifyControl(n, 1), n.showing || n.setShowing(!0);
this.inherited(arguments);
}
});

// CardSlideInArranger.js

enyo.kind({
name: "enyo.CardSlideInArranger",
kind: "CardArranger",
start: function() {
var e = this.container.getPanels();
for (var t = 0, n; n = e[t]; t++) {
var r = n.showing;
n.setShowing(t == this.container.fromIndex || t == this.container.toIndex), n.showing && !r && n.resized();
}
var i = this.container.fromIndex, t = this.container.toIndex;
this.container.transitionPoints = [ t + "." + i + ".s", t + "." + i + ".f" ];
},
finish: function() {
this.inherited(arguments);
var e = this.container.getPanels();
for (var t = 0, n; n = e[t]; t++) n.setShowing(t == this.container.toIndex);
},
arrange: function(e, t) {
var n = t.split("."), r = n[0], i = n[1], s = n[2] == "s", o = this.containerBounds.width;
for (var u = 0, a = this.container.getPanels(), f, l; f = a[u]; u++) l = o, i == u && (l = s ? 0 : -o), r == u && (l = s ? o : 0), i == u && i == r && (l = 0), this.arrangeControl(f, {
left: l
});
},
destroy: function() {
var e = this.container.getPanels();
for (var t = 0, n; n = e[t]; t++) enyo.Arranger.positionControl(n, {
left: null
});
this.inherited(arguments);
}
});

// CarouselArranger.js

enyo.kind({
name: "enyo.CarouselArranger",
kind: "Arranger",
size: function() {
var e = this.container.getPanels(), t = this.containerPadding = this.container.hasNode() ? enyo.dom.calcPaddingExtents(this.container.node) : {}, n = this.containerBounds;
n.height -= t.top + t.bottom, n.width -= t.left + t.right;
var r;
for (var i = 0, s = 0, o, u; u = e[i]; i++) o = enyo.dom.calcMarginExtents(u.hasNode()), u.width = u.getBounds().width, u.marginWidth = o.right + o.left, s += (u.fit ? 0 : u.width) + u.marginWidth, u.fit && (r = u);
if (r) {
var a = n.width - s;
r.width = a >= 0 ? a : r.width;
}
for (var i = 0, f = t.left, o, u; u = e[i]; i++) u.setBounds({
top: t.top,
bottom: t.bottom,
width: u.fit ? u.width : null
});
},
arrange: function(e, t) {
this.container.wrap ? this.arrangeWrap(e, t) : this.arrangeNoWrap(e, t);
},
arrangeNoWrap: function(e, t) {
var n = this.container.getPanels(), r = this.container.clamp(t), i = this.containerBounds.width;
for (var s = r, o = 0, u; u = n[s]; s++) {
o += u.width + u.marginWidth;
if (o > i) break;
}
var a = i - o, f = 0;
if (a > 0) {
var l = r;
for (var s = r - 1, c = 0, u; u = n[s]; s--) {
c += u.width + u.marginWidth;
if (a - c <= 0) {
f = a - c, r = s;
break;
}
}
}
for (var s = 0, h = this.containerPadding.left + f, p, u; u = n[s]; s++) p = u.width + u.marginWidth, s < r ? this.arrangeControl(u, {
left: -p
}) : (this.arrangeControl(u, {
left: Math.floor(h)
}), h += p);
},
arrangeWrap: function(e, t) {
for (var n = 0, r = this.containerPadding.left, i, s; s = e[n]; n++) this.arrangeControl(s, {
left: r
}), r += s.width + s.marginWidth;
},
calcArrangementDifference: function(e, t, n, r) {
var i = Math.abs(e % this.c$.length);
return t[i].left - r[i].left;
},
destroy: function() {
var e = this.container.getPanels();
for (var t = 0, n; n = e[t]; t++) enyo.Arranger.positionControl(n, {
left: null,
top: null
}), n.applyStyle("top", null), n.applyStyle("bottom", null), n.applyStyle("left", null), n.applyStyle("width", null);
this.inherited(arguments);
}
});

// CollapsingArranger.js

enyo.kind({
name: "enyo.CollapsingArranger",
kind: "CarouselArranger",
size: function() {
this.clearLastSize(), this.inherited(arguments);
},
clearLastSize: function() {
for (var e = 0, t = this.container.getPanels(), n; n = t[e]; e++) n._fit && e != t.length - 1 && (n.applyStyle("width", null), n._fit = null);
},
arrange: function(e, t) {
var n = this.container.getPanels();
for (var r = 0, i = this.containerPadding.left, s, o; o = n[r]; r++) this.arrangeControl(o, {
left: i
}), r >= t && (i += o.width + o.marginWidth), r == n.length - 1 && t < 0 && this.arrangeControl(o, {
left: i - t
});
},
calcArrangementDifference: function(e, t, n, r) {
var i = this.container.getPanels().length - 1;
return Math.abs(r[i].left - t[i].left);
},
flowControl: function(e, t) {
this.inherited(arguments);
if (this.container.realtimeFit) {
var n = this.container.getPanels(), r = n.length - 1, i = n[r];
e == i && this.fitControl(e, t.left);
}
},
finish: function() {
this.inherited(arguments);
if (!this.container.realtimeFit && this.containerBounds) {
var e = this.container.getPanels(), t = this.container.arrangement, n = e.length - 1, r = e[n];
this.fitControl(r, t[n].left);
}
},
fitControl: function(e, t) {
e._fit = !0, e.applyStyle("width", this.containerBounds.width - t + "px"), e.resized();
}
});

// OtherArrangers.js

enyo.kind({
name: "enyo.LeftRightArranger",
kind: "Arranger",
margin: 40,
axisSize: "width",
offAxisSize: "height",
axisPosition: "left",
constructor: function() {
this.inherited(arguments), this.margin = this.container.margin != null ? this.container.margin : this.margin;
},
size: function() {
var e = this.container.getPanels(), t = this.containerBounds[this.axisSize], n = t - this.margin - this.margin;
for (var r = 0, i, s; s = e[r]; r++) i = {}, i[this.axisSize] = n, i[this.offAxisSize] = "100%", s.setBounds(i);
},
start: function() {
this.inherited(arguments);
var e = this.container.fromIndex, t = this.container.toIndex, n = this.getOrderedControls(t), r = Math.floor(n.length / 2);
for (var i = 0, s; s = n[i]; i++) e > t ? i == n.length - r ? s.applyStyle("z-index", 0) : s.applyStyle("z-index", 1) : i == n.length - 1 - r ? s.applyStyle("z-index", 0) : s.applyStyle("z-index", 1);
},
arrange: function(e, t) {
if (this.container.getPanels().length == 1) {
var n = {};
n[this.axisPosition] = this.margin, this.arrangeControl(this.container.getPanels()[0], n);
return;
}
var r = Math.floor(this.container.getPanels().length / 2), i = this.getOrderedControls(Math.floor(t) - r), s = this.containerBounds[this.axisSize] - this.margin - this.margin, o = this.margin - s * r;
for (var u = 0, a, n, f; a = i[u]; u++) n = {}, n[this.axisPosition] = o, this.arrangeControl(a, n), o += s;
},
calcArrangementDifference: function(e, t, n, r) {
if (this.container.getPanels().length == 1) return 0;
var i = Math.abs(e % this.c$.length);
return t[i][this.axisPosition] - r[i][this.axisPosition];
},
destroy: function() {
var e = this.container.getPanels();
for (var t = 0, n; n = e[t]; t++) enyo.Arranger.positionControl(n, {
left: null,
top: null
}), enyo.Arranger.opacifyControl(n, 1), n.applyStyle("left", null), n.applyStyle("top", null), n.applyStyle("height", null), n.applyStyle("width", null);
this.inherited(arguments);
}
}), enyo.kind({
name: "enyo.TopBottomArranger",
kind: "LeftRightArranger",
dragProp: "ddy",
dragDirectionProp: "yDirection",
canDragProp: "vertical",
axisSize: "height",
offAxisSize: "width",
axisPosition: "top"
}), enyo.kind({
name: "enyo.SpiralArranger",
kind: "Arranger",
incrementalPoints: !0,
inc: 20,
size: function() {
var e = this.container.getPanels(), t = this.containerBounds, n = this.controlWidth = t.width / 3, r = this.controlHeight = t.height / 3;
for (var i = 0, s; s = e[i]; i++) s.setBounds({
width: n,
height: r
});
},
arrange: function(e, t) {
var n = this.inc;
for (var r = 0, i = e.length, s; s = e[r]; r++) {
var o = Math.cos(r / i * 2 * Math.PI) * r * n + this.controlWidth, u = Math.sin(r / i * 2 * Math.PI) * r * n + this.controlHeight;
this.arrangeControl(s, {
left: o,
top: u
});
}
},
start: function() {
this.inherited(arguments);
var e = this.getOrderedControls(this.container.toIndex);
for (var t = 0, n; n = e[t]; t++) n.applyStyle("z-index", e.length - t);
},
calcArrangementDifference: function(e, t, n, r) {
return this.controlWidth;
},
destroy: function() {
var e = this.container.getPanels();
for (var t = 0, n; n = e[t]; t++) n.applyStyle("z-index", null), enyo.Arranger.positionControl(n, {
left: null,
top: null
}), n.applyStyle("left", null), n.applyStyle("top", null), n.applyStyle("height", null), n.applyStyle("width", null);
this.inherited(arguments);
}
}), enyo.kind({
name: "enyo.GridArranger",
kind: "Arranger",
incrementalPoints: !0,
colWidth: 100,
colHeight: 100,
size: function() {
var e = this.container.getPanels(), t = this.colWidth, n = this.colHeight;
for (var r = 0, i; i = e[r]; r++) i.setBounds({
width: t,
height: n
});
},
arrange: function(e, t) {
var n = this.colWidth, r = this.colHeight, i = Math.max(1, Math.floor(this.containerBounds.width / n)), s;
for (var o = 0, u = 0; u < e.length; o++) for (var a = 0; a < i && (s = e[u]); a++, u++) this.arrangeControl(s, {
left: n * a,
top: r * o
});
},
flowControl: function(e, t) {
this.inherited(arguments), enyo.Arranger.opacifyControl(e, t.top % this.colHeight !== 0 ? .25 : 1);
},
calcArrangementDifference: function(e, t, n, r) {
return this.colWidth;
},
destroy: function() {
var e = this.container.getPanels();
for (var t = 0, n; n = e[t]; t++) enyo.Arranger.positionControl(n, {
left: null,
top: null
}), n.applyStyle("left", null), n.applyStyle("top", null), n.applyStyle("height", null), n.applyStyle("width", null);
this.inherited(arguments);
}
});

// Panels.js

enyo.kind({
name: "enyo.Panels",
classes: "enyo-panels",
published: {
index: 0,
draggable: !0,
animate: !0,
wrap: !1,
arrangerKind: "CardArranger",
narrowFit: !0
},
events: {
onTransitionStart: "",
onTransitionFinish: ""
},
handlers: {
ondragstart: "dragstart",
ondrag: "drag",
ondragfinish: "dragfinish"
},
tools: [ {
kind: "Animator",
onStep: "step",
onEnd: "completed"
} ],
fraction: 0,
create: function() {
this.transitionPoints = [], this.inherited(arguments), this.arrangerKindChanged(), this.narrowFitChanged(), this.indexChanged();
},
initComponents: function() {
this.createChrome(this.tools), this.inherited(arguments);
},
arrangerKindChanged: function() {
this.setLayoutKind(this.arrangerKind);
},
narrowFitChanged: function() {
this.addRemoveClass("enyo-panels-fit-narrow", this.narrowFit);
},
removeControl: function(e) {
this.inherited(arguments), this.controls.length > 1 && this.isPanel(e) && (this.setIndex(Math.max(this.index - 1, 0)), this.flow(), this.reflow());
},
isPanel: function() {
return !0;
},
flow: function() {
this.arrangements = [], this.inherited(arguments);
},
reflow: function() {
this.arrangements = [], this.inherited(arguments), this.refresh();
},
getPanels: function() {
var e = this.controlParent || this;
return e.children;
},
getActive: function() {
var e = this.getPanels();
return e[this.index];
},
getAnimator: function() {
return this.$.animator;
},
setIndex: function(e) {
this.setPropertyValue("index", e, "indexChanged");
},
setIndexDirect: function(e) {
this.setIndex(e), this.completed();
},
previous: function() {
this.setIndex(this.index - 1);
},
next: function() {
this.setIndex(this.index + 1);
},
clamp: function(e) {
var t = this.getPanels().length - 1;
return this.wrap ? e : Math.max(0, Math.min(e, t));
},
indexChanged: function(e) {
this.lastIndex = e, this.index = this.clamp(this.index), this.dragging || (this.$.animator.isAnimating() && this.completed(), this.$.animator.stop(), this.hasNode() && (this.animate ? (this.startTransition(), this.$.animator.play({
startValue: this.fraction
})) : this.refresh()));
},
step: function(e) {
this.fraction = e.value, this.stepTransition();
},
completed: function() {
this.$.animator.isAnimating() && this.$.animator.stop(), this.fraction = 1, this.stepTransition(), this.finishTransition();
},
dragstart: function(e, t) {
if (this.draggable && this.layout && this.layout.canDragEvent(t)) return t.preventDefault(), this.dragstartTransition(t), this.dragging = !0, this.$.animator.stop(), !0;
},
drag: function(e, t) {
this.dragging && (t.preventDefault(), this.dragTransition(t));
},
dragfinish: function(e, t) {
this.dragging && (this.dragging = !1, t.preventTap(), this.dragfinishTransition(t));
},
dragstartTransition: function(e) {
if (!this.$.animator.isAnimating()) {
var t = this.fromIndex = this.index;
this.toIndex = t - (this.layout ? this.layout.calcDragDirection(e) : 0);
} else this.verifyDragTransition(e);
this.fromIndex = this.clamp(this.fromIndex), this.toIndex = this.clamp(this.toIndex), this.fireTransitionStart(), this.layout && this.layout.start();
},
dragTransition: function(e) {
var t = this.layout ? this.layout.calcDrag(e) : 0, n = this.transitionPoints, r = n[0], i = n[n.length - 1], s = this.fetchArrangement(r), o = this.fetchArrangement(i), u = this.layout ? this.layout.drag(t, r, s, i, o) : 0, a = t && !u;
a, this.fraction += u;
var f = this.fraction;
if (f > 1 || f < 0 || a) (f > 0 || a) && this.dragfinishTransition(e), this.dragstartTransition(e), this.fraction = 0;
this.stepTransition();
},
dragfinishTransition: function(e) {
this.verifyDragTransition(e), this.setIndex(this.toIndex), this.dragging && this.fireTransitionFinish();
},
verifyDragTransition: function(e) {
var t = this.layout ? this.layout.calcDragDirection(e) : 0, n = Math.min(this.fromIndex, this.toIndex), r = Math.max(this.fromIndex, this.toIndex);
if (t > 0) {
var i = n;
n = r, r = i;
}
n != this.fromIndex && (this.fraction = 1 - this.fraction), this.fromIndex = n, this.toIndex = r;
},
refresh: function() {
this.$.animator.isAnimating() && this.$.animator.stop(), this.startTransition(), this.fraction = 1, this.stepTransition(), this.finishTransition();
},
startTransition: function() {
this.fromIndex = this.fromIndex != null ? this.fromIndex : this.lastIndex || 0, this.toIndex = this.toIndex != null ? this.toIndex : this.index, this.layout && this.layout.start(), this.fireTransitionStart();
},
finishTransition: function() {
this.layout && this.layout.finish(), this.transitionPoints = [], this.fraction = 0, this.fromIndex = this.toIndex = null, this.fireTransitionFinish();
},
fireTransitionStart: function() {
var e = this.startTransitionInfo;
this.hasNode() && (!e || e.fromIndex != this.fromIndex || e.toIndex != this.toIndex) && (this.startTransitionInfo = {
fromIndex: this.fromIndex,
toIndex: this.toIndex
}, this.doTransitionStart(enyo.clone(this.startTransitionInfo)));
},
fireTransitionFinish: function() {
var e = this.finishTransitionInfo;
this.hasNode() && (!e || e.fromIndex != this.lastIndex || e.toIndex != this.index) && (this.finishTransitionInfo = {
fromIndex: this.lastIndex,
toIndex: this.index
}, this.doTransitionFinish(enyo.clone(this.finishTransitionInfo))), this.lastIndex = this.index;
},
stepTransition: function() {
if (this.hasNode()) {
var e = this.transitionPoints, t = (this.fraction || 0) * (e.length - 1), n = Math.floor(t);
t -= n;
var r = e[n], i = e[n + 1], s = this.fetchArrangement(r), o = this.fetchArrangement(i);
this.arrangement = s && o ? enyo.Panels.lerp(s, o, t) : s || o, this.arrangement && this.layout && this.layout.flowArrangement();
}
},
fetchArrangement: function(e) {
return e != null && !this.arrangements[e] && this.layout && (this.layout._arrange(e), this.arrangements[e] = this.readArrangement(this.getPanels())), this.arrangements[e];
},
readArrangement: function(e) {
var t = [];
for (var n = 0, r = e, i; i = r[n]; n++) t.push(enyo.clone(i._arranger));
return t;
},
statics: {
isScreenNarrow: function() {
return enyo.dom.getWindowWidth() <= 800;
},
lerp: function(e, t, n) {
var r = [];
for (var i = 0, s = enyo.keys(e), o; o = s[i]; i++) r.push(this.lerpObject(e[o], t[o], n));
return r;
},
lerpObject: function(e, t, n) {
var r = enyo.clone(e), i, s;
if (t) for (var o in e) i = e[o], s = t[o], i != s && (r[o] = i - (i - s) * n);
return r;
}
}
});

// Node.js

enyo.kind({
name: "enyo.Node",
published: {
expandable: !1,
expanded: !1,
icon: "",
onlyIconExpands: !1,
selected: !1
},
style: "padding: 0 0 0 16px;",
content: "Node",
defaultKind: "Node",
classes: "enyo-node",
components: [ {
name: "icon",
kind: "Image",
showing: !1
}, {
kind: "Control",
name: "caption",
Xtag: "span",
style: "display: inline-block; padding: 4px;",
allowHtml: !0
}, {
kind: "Control",
name: "extra",
tag: "span",
allowHtml: !0
} ],
childClient: [ {
kind: "Control",
name: "box",
classes: "enyo-node-box",
Xstyle: "border: 1px solid orange;",
components: [ {
kind: "Control",
name: "client",
classes: "enyo-node-client",
Xstyle: "border: 1px solid lightblue;"
} ]
} ],
handlers: {
ondblclick: "dblclick"
},
events: {
onNodeTap: "nodeTap",
onNodeDblClick: "nodeDblClick",
onExpand: "nodeExpand",
onDestroyed: "nodeDestroyed"
},
create: function() {
this.inherited(arguments), this.selectedChanged(), this.iconChanged();
},
destroy: function() {
this.doDestroyed(), this.inherited(arguments);
},
initComponents: function() {
this.expandable && (this.kindComponents = this.kindComponents.concat(this.childClient)), this.inherited(arguments);
},
contentChanged: function() {
this.$.caption.setContent(this.content);
},
iconChanged: function() {
this.$.icon.setSrc(this.icon), this.$.icon.setShowing(Boolean(this.icon));
},
selectedChanged: function() {
this.addRemoveClass("enyo-selected", this.selected);
},
rendered: function() {
this.inherited(arguments), this.expandable && !this.expanded && this.quickCollapse();
},
addNodes: function(e) {
this.destroyClientControls();
for (var t = 0, n; n = e[t]; t++) this.createComponent(n);
this.$.client.render();
},
addTextNodes: function(e) {
this.destroyClientControls();
for (var t = 0, n; n = e[t]; t++) this.createComponent({
content: n
});
this.$.client.render();
},
tap: function(e, t) {
return this.onlyIconExpands ? t.target == this.$.icon.hasNode() ? this.toggleExpanded() : this.doNodeTap() : (this.toggleExpanded(), this.doNodeTap()), !0;
},
dblclick: function(e, t) {
return this.doNodeDblClick(), !0;
},
toggleExpanded: function() {
this.setExpanded(!this.expanded);
},
quickCollapse: function() {
this.removeClass("enyo-animate"), this.$.box.applyStyle("height", "0");
var e = this.$.client.getBounds().height;
this.$.client.setBounds({
top: -e
});
},
_expand: function() {
this.addClass("enyo-animate");
var e = this.$.client.getBounds().height;
this.$.box.setBounds({
height: e
}), this.$.client.setBounds({
top: 0
}), setTimeout(enyo.bind(this, function() {
this.expanded && (this.removeClass("enyo-animate"), this.$.box.applyStyle("height", "auto"));
}), 225);
},
_collapse: function() {
this.removeClass("enyo-animate");
var e = this.$.client.getBounds().height;
this.$.box.setBounds({
height: e
}), setTimeout(enyo.bind(this, function() {
this.addClass("enyo-animate"), this.$.box.applyStyle("height", "0"), this.$.client.setBounds({
top: -e
});
}), 25);
},
expandedChanged: function(e) {
if (!this.expandable) this.expanded = !1; else {
var t = {
expanded: this.expanded
};
this.doExpand(t), t.wait || this.effectExpanded();
}
},
effectExpanded: function() {
this.$.client && (this.expanded ? this._expand() : this._collapse());
}
});

// Icon.js

enyo.kind({
name: "onyx.Icon",
published: {
src: "",
disabled: !1
},
classes: "onyx-icon",
create: function() {
this.inherited(arguments), this.src && this.srcChanged(), this.disabledChanged();
},
disabledChanged: function() {
this.addRemoveClass("disabled", this.disabled);
},
srcChanged: function() {
this.applyStyle("background-image", "url(" + enyo.path.rewrite(this.src) + ")");
}
});

// Button.js

enyo.kind({
name: "onyx.Button",
kind: "enyo.Button",
classes: "onyx-button enyo-unselectable"
});

// IconButton.js

enyo.kind({
name: "onyx.IconButton",
kind: "onyx.Icon",
published: {
active: !1
},
classes: "onyx-icon-button",
rendered: function() {
this.inherited(arguments), this.activeChanged();
},
tap: function() {
if (this.disabled) return !0;
this.setActive(!0);
},
activeChanged: function() {
this.bubble("onActivate");
}
});

// Checkbox.js

enyo.kind({
name: "onyx.Checkbox",
classes: "onyx-checkbox",
kind: enyo.Checkbox,
tag: "div",
handlers: {
ondown: "downHandler",
onclick: ""
},
downHandler: function(e, t) {
return this.disabled || (this.setChecked(!this.getChecked()), this.bubble("onchange")), !0;
},
tap: function(e, t) {
return !this.disabled;
}
});

// Drawer.js

enyo.kind({
name: "onyx.Drawer",
published: {
open: !0,
orient: "v"
},
style: "overflow: hidden; position: relative;",
tools: [ {
kind: "Animator",
onStep: "animatorStep",
onEnd: "animatorEnd"
}, {
name: "client",
style: "position: relative;",
classes: "enyo-border-box"
} ],
create: function() {
this.inherited(arguments), this.openChanged();
},
initComponents: function() {
this.createChrome(this.tools), this.inherited(arguments);
},
openChanged: function() {
this.$.client.show();
if (this.hasNode()) if (this.$.animator.isAnimating()) this.$.animator.reverse(); else {
var e = this.orient == "v", t = e ? "height" : "width", n = e ? "top" : "left";
this.applyStyle(t, null);
var r = this.hasNode()[e ? "scrollHeight" : "scrollWidth"];
this.$.animator.play({
startValue: this.open ? 0 : r,
endValue: this.open ? r : 0,
dimension: t,
position: n
});
} else this.$.client.setShowing(this.open);
},
animatorStep: function(e) {
if (this.hasNode()) {
var t = e.dimension;
this.node.style[t] = this.domStyles[t] = e.value + "px";
}
var n = this.$.client.hasNode();
if (n) {
var r = e.position, i = this.open ? e.endValue : e.startValue;
n.style[r] = this.$.client.domStyles[r] = e.value - i + "px";
}
this.container && this.container.resized();
},
animatorEnd: function() {
if (!this.open) this.$.client.hide(); else {
var e = this.orient == "v" ? "height" : "width", t = this.hasNode();
t && (t.style[e] = this.$.client.domStyles[e] = null);
}
this.container && this.container.resized();
}
});

// Grabber.js

enyo.kind({
name: "onyx.Grabber",
classes: "onyx-grabber"
});

// Groupbox.js

enyo.kind({
name: "onyx.Groupbox",
classes: "onyx-groupbox"
}), enyo.kind({
name: "onyx.GroupboxHeader",
classes: "onyx-groupbox-header"
});

// Input.js

enyo.kind({
name: "onyx.Input",
kind: "enyo.Input",
classes: "onyx-input"
});

// Popup.js

enyo.kind({
name: "onyx.Popup",
kind: "Popup",
classes: "onyx-popup",
published: {
scrimWhenModal: !0,
scrim: !1,
scrimClassName: ""
},
statics: {
count: 0
},
defaultZ: 120,
showingChanged: function() {
this.showing ? (onyx.Popup.count++, this.applyZIndex()) : onyx.Popup.count > 0 && onyx.Popup.count--, this.showHideScrim(this.showing), this.inherited(arguments);
},
showHideScrim: function(e) {
if (this.floating && (this.scrim || this.modal && this.scrimWhenModal)) {
var t = this.getScrim();
if (e) {
var n = this.getScrimZIndex();
this._scrimZ = n, t.showAtZIndex(n);
} else t.hideAtZIndex(this._scrimZ);
enyo.call(t, "addRemoveClass", [ this.scrimClassName, t.showing ]);
}
},
getScrimZIndex: function() {
return this.findZIndex() - 1;
},
getScrim: function() {
return this.modal && this.scrimWhenModal && !this.scrim ? onyx.scrimTransparent.make() : onyx.scrim.make();
},
applyZIndex: function() {
this._zIndex = onyx.Popup.count * 2 + this.findZIndex() + 1, this.applyStyle("z-index", this._zIndex);
},
findZIndex: function() {
var e = this.defaultZ;
return this._zIndex ? e = this._zIndex : this.hasNode() && (e = Number(enyo.dom.getComputedStyleValue(this.node, "z-index")) || e), this._zIndex = e;
}
});

// TextArea.js

enyo.kind({
name: "onyx.TextArea",
kind: "enyo.TextArea",
classes: "onyx-textarea"
});

// RichText.js

enyo.kind({
name: "onyx.RichText",
kind: "enyo.RichText",
classes: "onyx-richtext"
});

// InputDecorator.js

enyo.kind({
name: "onyx.InputDecorator",
kind: "enyo.ToolDecorator",
tag: "label",
classes: "onyx-input-decorator",
published: {
alwaysLooksFocused: !1
},
handlers: {
onDisabledChange: "disabledChange",
onfocus: "receiveFocus",
onblur: "receiveBlur"
},
create: function() {
this.inherited(arguments), this.updateFocus(!1);
},
alwaysLooksFocusedChanged: function(e) {
this.updateFocus(this.focus);
},
updateFocus: function(e) {
this.focused = e, this.addRemoveClass("onyx-focused", this.alwaysLooksFocused || this.focused);
},
receiveFocus: function() {
this.updateFocus(!0);
},
receiveBlur: function() {
this.updateFocus(!1);
},
disabledChange: function(e, t) {
this.addRemoveClass("onyx-disabled", t.originator.disabled);
}
});

// Tooltip.js

enyo.kind({
name: "onyx.Tooltip",
kind: "onyx.Popup",
classes: "onyx-tooltip below left-arrow",
autoDismiss: !1,
showDelay: 500,
defaultLeft: -6,
handlers: {
onRequestShowTooltip: "requestShow",
onRequestHideTooltip: "requestHide"
},
requestShow: function() {
return this.showJob = setTimeout(enyo.bind(this, "show"), this.showDelay), !0;
},
cancelShow: function() {
clearTimeout(this.showJob);
},
requestHide: function() {
return this.cancelShow(), this.inherited(arguments);
},
showingChanged: function() {
this.cancelShow(), this.adjustPosition(!0), this.inherited(arguments);
},
applyPosition: function(e) {
var t = "";
for (n in e) t += n + ":" + e[n] + (isNaN(e[n]) ? "; " : "px; ");
this.addStyles(t);
},
adjustPosition: function(e) {
if (this.showing && this.hasNode()) {
var t = this.node.getBoundingClientRect();
t.top + t.height > window.innerHeight ? (this.addRemoveClass("below", !1), this.addRemoveClass("above", !0)) : (this.addRemoveClass("above", !1), this.addRemoveClass("below", !0)), t.left + t.width > window.innerWidth && (this.applyPosition({
"margin-left": -t.width,
bottom: "auto"
}), this.addRemoveClass("left-arrow", !1), this.addRemoveClass("right-arrow", !0));
}
},
resizeHandler: function() {
this.applyPosition({
"margin-left": this.defaultLeft,
bottom: "auto"
}), this.addRemoveClass("left-arrow", !0), this.addRemoveClass("right-arrow", !1), this.adjustPosition(!0), this.inherited(arguments);
}
});

// TooltipDecorator.js

enyo.kind({
name: "onyx.TooltipDecorator",
defaultKind: "onyx.Button",
classes: "onyx-popup-decorator",
handlers: {
onenter: "enter",
onleave: "leave"
},
enter: function() {
this.requestShowTooltip();
},
leave: function() {
this.requestHideTooltip();
},
tap: function() {
this.requestHideTooltip();
},
requestShowTooltip: function() {
this.waterfallDown("onRequestShowTooltip");
},
requestHideTooltip: function() {
this.waterfallDown("onRequestHideTooltip");
}
});

// MenuDecorator.js

enyo.kind({
name: "onyx.MenuDecorator",
kind: "onyx.TooltipDecorator",
defaultKind: "onyx.Button",
classes: "onyx-popup-decorator enyo-unselectable",
handlers: {
onActivate: "activated",
onHide: "menuHidden"
},
activated: function(e, t) {
this.requestHideTooltip(), t.originator.active && (this.menuActive = !0, this.activator = t.originator, this.activator.addClass("active"), this.requestShowMenu());
},
requestShowMenu: function() {
this.waterfallDown("onRequestShowMenu", {
activator: this.activator
});
},
requestHideMenu: function() {
this.waterfallDown("onRequestHideMenu");
},
menuHidden: function() {
this.menuActive = !1, this.activator && (this.activator.setActive(!1), this.activator.removeClass("active"));
},
enter: function(e) {
this.menuActive || this.inherited(arguments);
},
leave: function(e, t) {
this.menuActive || this.inherited(arguments);
}
});

// Menu.js

enyo.kind({
name: "onyx.Menu",
kind: "onyx.Popup",
modal: !0,
defaultKind: "onyx.MenuItem",
classes: "onyx-menu",
published: {
maxHeight: 200,
scrolling: !0
},
handlers: {
onActivate: "itemActivated",
onRequestShowMenu: "requestMenuShow",
onRequestHideMenu: "requestHide"
},
childComponents: [ {
name: "client",
kind: "enyo.Scroller",
strategyKind: "TouchScrollStrategy"
} ],
showOnTop: !1,
scrollerName: "client",
create: function() {
this.inherited(arguments), this.maxHeightChanged();
},
initComponents: function() {
this.scrolling ? this.createComponents(this.childComponents, {
isChrome: !0
}) : enyo.nop, this.inherited(arguments);
},
getScroller: function() {
return this.$[this.scrollerName];
},
maxHeightChanged: function() {
this.scrolling ? this.getScroller().setMaxHeight(this.maxHeight + "px") : enyo.nop;
},
itemActivated: function(e, t) {
return t.originator.setActive(!1), !0;
},
showingChanged: function() {
this.inherited(arguments), this.scrolling ? this.getScroller().setShowing(this.showing) : enyo.nop, this.adjustPosition(!0);
},
requestMenuShow: function(e, t) {
if (this.floating) {
var n = t.activator.hasNode();
if (n) {
var r = this.activatorOffset = this.getPageOffset(n);
this.applyPosition({
top: r.top + (this.showOnTop ? 0 : r.height),
left: r.left,
width: r.width
});
}
}
return this.show(), !0;
},
applyPosition: function(e) {
var t = "";
for (n in e) t += n + ":" + e[n] + (isNaN(e[n]) ? "; " : "px; ");
this.addStyles(t);
},
getPageOffset: function(e) {
var t = e.getBoundingClientRect(), n = window.pageYOffset === undefined ? document.documentElement.scrollTop : window.pageYOffset, r = window.pageXOffset === undefined ? document.documentElement.scrollLeft : window.pageXOffset, i = t.height === undefined ? t.bottom - t.top : t.height, s = t.width === undefined ? t.right - t.left : t.width;
return {
top: t.top + n,
left: t.left + r,
height: i,
width: s
};
},
adjustPosition: function() {
if (this.showing && this.hasNode()) {
this.scrolling && !this.showOnTop ? this.getScroller().setMaxHeight(this.maxHeight + "px") : enyo.nop, this.removeClass("onyx-menu-up"), this.floating ? enyo.noop : this.applyPosition({
left: "auto"
});
var e = this.node.getBoundingClientRect(), t = e.height === undefined ? e.bottom - e.top : e.height, n = window.innerHeight === undefined ? document.documentElement.clientHeight : window.innerHeight, r = window.innerWidth === undefined ? document.documentElement.clientWidth : window.innerWidth;
this.menuUp = e.top + t > n && n - e.bottom < e.top - t, this.addRemoveClass("onyx-menu-up", this.menuUp);
if (this.floating) {
var i = this.activatorOffset;
this.menuUp ? this.applyPosition({
top: i.top - t + (this.showOnTop ? i.height : 0),
bottom: "auto"
}) : e.top < i.top && i.top + (this.showOnTop ? 0 : i.height) + t < n && this.applyPosition({
top: i.top + (this.showOnTop ? 0 : i.height),
bottom: "auto"
});
}
e.right > r && (this.floating ? this.applyPosition({
left: i.left - (e.left + e.width - r)
}) : this.applyPosition({
left: -(e.right - r)
})), e.left < 0 && (this.floating ? this.applyPosition({
left: 0,
right: "auto"
}) : this.getComputedStyleValue("right") == "auto" ? this.applyPosition({
left: -e.left
}) : this.applyPosition({
right: e.left
}));
if (this.scrolling && !this.showOnTop) {
e = this.node.getBoundingClientRect();
var s;
this.menuUp ? s = this.maxHeight < e.bottom ? this.maxHeight : e.bottom : s = e.top + this.maxHeight < n ? this.maxHeight : n - e.top, this.getScroller().setMaxHeight(s + "px");
}
}
},
resizeHandler: function() {
this.inherited(arguments), this.adjustPosition();
},
requestHide: function() {
this.setShowing(!1);
}
});

// MenuItem.js

enyo.kind({
name: "onyx.MenuItem",
kind: "enyo.Button",
tag: "div",
classes: "onyx-menu-item",
events: {
onSelect: ""
},
tap: function(e) {
this.inherited(arguments), this.bubble("onRequestHideMenu"), this.doSelect({
selected: this,
content: this.content
});
}
});

// PickerDecorator.js

enyo.kind({
name: "onyx.PickerDecorator",
kind: "onyx.MenuDecorator",
classes: "onyx-picker-decorator",
defaultKind: "onyx.PickerButton",
handlers: {
onChange: "change"
},
change: function(e, t) {
this.waterfallDown("onChange", t);
}
});

// PickerButton.js

enyo.kind({
name: "onyx.PickerButton",
kind: "onyx.Button",
handlers: {
onChange: "change"
},
change: function(e, t) {
this.setContent(t.content);
}
});

// Picker.js

enyo.kind({
name: "onyx.Picker",
kind: "onyx.Menu",
classes: "onyx-picker enyo-unselectable",
published: {
selected: null
},
events: {
onChange: ""
},
floating: !0,
showOnTop: !0,
initComponents: function() {
this.setScrolling(!0), this.inherited(arguments);
},
showingChanged: function() {
this.getScroller().setShowing(this.showing), this.inherited(arguments), this.showing && this.selected && this.scrollToSelected();
},
scrollToSelected: function() {
this.getScroller().scrollToControl(this.selected, !this.menuUp);
},
itemActivated: function(e, t) {
return this.processActivatedItem(t.originator), this.inherited(arguments);
},
processActivatedItem: function(e) {
e.active && this.setSelected(e);
},
selectedChanged: function(e) {
e && e.removeClass("selected"), this.selected && (this.selected.addClass("selected"), this.doChange({
selected: this.selected,
content: this.selected.content
}));
},
resizeHandler: function() {
this.inherited(arguments), this.adjustPosition();
}
});

// FlyweightPicker.js

enyo.kind({
name: "onyx.FlyweightPicker",
kind: "onyx.Picker",
classes: "onyx-flyweight-picker",
published: {
count: 0
},
events: {
onSetupItem: "",
onSelect: ""
},
handlers: {
onSelect: "itemSelect"
},
components: [ {
name: "scroller",
kind: "enyo.Scroller",
strategyKind: "TouchScrollStrategy",
components: [ {
name: "flyweight",
kind: "FlyweightRepeater",
ontap: "itemTap"
} ]
} ],
scrollerName: "scroller",
initComponents: function() {
this.controlParentName = "flyweight", this.inherited(arguments);
},
create: function() {
this.inherited(arguments), this.countChanged();
},
rendered: function() {
this.inherited(arguments), this.selectedChanged();
},
scrollToSelected: function() {
var e = this.$.flyweight.fetchRowNode(this.selected);
this.getScroller().scrollToNode(e, !this.menuUp);
},
countChanged: function() {
this.$.flyweight.count = this.count;
},
processActivatedItem: function(e) {
this.item = e;
},
selectedChanged: function(e) {
if (!this.item) return;
e !== undefined && (this.item.removeClass("selected"), this.$.flyweight.renderRow(e)), this.item.addClass("selected"), this.$.flyweight.renderRow(this.selected), this.item.removeClass("selected");
var t = this.$.flyweight.fetchRowNode(this.selected);
this.doChange({
selected: this.selected,
content: t && t.textContent || this.item.content
});
},
itemTap: function(e, t) {
this.setSelected(t.rowIndex), this.doSelect({
selected: this.item,
content: this.item.content
});
},
itemSelect: function(e, t) {
if (t.originator != this) return !0;
}
});

// RadioButton.js

enyo.kind({
name: "onyx.RadioButton",
kind: "Button",
classes: "onyx-radiobutton"
});

// RadioGroup.js

enyo.kind({
name: "onyx.RadioGroup",
kind: "Group",
highlander: !0,
defaultKind: "onyx.RadioButton"
});

// ToggleButton.js

enyo.kind({
name: "onyx.ToggleButton",
classes: "onyx-toggle-button",
published: {
active: !1,
value: !1,
onContent: "On",
offContent: "Off",
disabled: !1
},
events: {
onChange: ""
},
handlers: {
ondragstart: "dragstart",
ondrag: "drag",
ondragfinish: "dragfinish"
},
components: [ {
name: "contentOn",
classes: "onyx-toggle-content on"
}, {
name: "contentOff",
classes: "onyx-toggle-content off"
}, {
classes: "onyx-toggle-button-knob"
} ],
create: function() {
this.inherited(arguments), this.value = Boolean(this.value || this.active), this.onContentChanged(), this.offContentChanged(), this.disabledChanged();
},
rendered: function() {
this.inherited(arguments), this.valueChanged();
},
valueChanged: function() {
this.addRemoveClass("off", !this.value), this.$.contentOn.setShowing(this.value), this.$.contentOff.setShowing(!this.value), this.setActive(this.value), this.doChange({
value: this.value
});
},
activeChanged: function() {
this.setValue(this.active), this.bubble("onActivate");
},
onContentChanged: function() {
this.$.contentOn.setContent(this.onContent || ""), this.$.contentOn.addRemoveClass("empty", !this.onContent);
},
offContentChanged: function() {
this.$.contentOff.setContent(this.offContent || ""), this.$.contentOff.addRemoveClass("empty", !this.onContent);
},
disabledChanged: function() {
this.addRemoveClass("disabled", this.disabled);
},
updateValue: function(e) {
this.disabled || this.setValue(e);
},
tap: function() {
this.updateValue(!this.value);
},
dragstart: function(e, t) {
if (t.horizontal) return t.preventDefault(), this.dragging = !0, this.dragged = !1, !0;
},
drag: function(e, t) {
if (this.dragging) {
var n = t.dx;
return Math.abs(n) > 10 && (this.updateValue(n > 0), this.dragged = !0), !0;
}
},
dragfinish: function(e, t) {
this.dragging = !1, this.dragged && t.preventTap();
}
});

// Toolbar.js

enyo.kind({
name: "onyx.Toolbar",
classes: "onyx onyx-toolbar onyx-toolbar-inline",
create: function() {
this.inherited(arguments), this.hasClass("onyx-menu-toolbar") && enyo.platform.android >= 4 && this.applyStyle("position", "static");
}
});

// Tooltip.js

enyo.kind({
name: "onyx.Tooltip",
kind: "onyx.Popup",
classes: "onyx-tooltip below left-arrow",
autoDismiss: !1,
showDelay: 500,
defaultLeft: -6,
handlers: {
onRequestShowTooltip: "requestShow",
onRequestHideTooltip: "requestHide"
},
requestShow: function() {
return this.showJob = setTimeout(enyo.bind(this, "show"), this.showDelay), !0;
},
cancelShow: function() {
clearTimeout(this.showJob);
},
requestHide: function() {
return this.cancelShow(), this.inherited(arguments);
},
showingChanged: function() {
this.cancelShow(), this.adjustPosition(!0), this.inherited(arguments);
},
applyPosition: function(e) {
var t = "";
for (n in e) t += n + ":" + e[n] + (isNaN(e[n]) ? "; " : "px; ");
this.addStyles(t);
},
adjustPosition: function(e) {
if (this.showing && this.hasNode()) {
var t = this.node.getBoundingClientRect();
t.top + t.height > window.innerHeight ? (this.addRemoveClass("below", !1), this.addRemoveClass("above", !0)) : (this.addRemoveClass("above", !1), this.addRemoveClass("below", !0)), t.left + t.width > window.innerWidth && (this.applyPosition({
"margin-left": -t.width,
bottom: "auto"
}), this.addRemoveClass("left-arrow", !1), this.addRemoveClass("right-arrow", !0));
}
},
resizeHandler: function() {
this.applyPosition({
"margin-left": this.defaultLeft,
bottom: "auto"
}), this.addRemoveClass("left-arrow", !0), this.addRemoveClass("right-arrow", !1), this.adjustPosition(!0), this.inherited(arguments);
}
});

// TooltipDecorator.js

enyo.kind({
name: "onyx.TooltipDecorator",
defaultKind: "onyx.Button",
classes: "onyx-popup-decorator",
handlers: {
onenter: "enter",
onleave: "leave"
},
enter: function() {
this.requestShowTooltip();
},
leave: function() {
this.requestHideTooltip();
},
tap: function() {
this.requestHideTooltip();
},
requestShowTooltip: function() {
this.waterfallDown("onRequestShowTooltip");
},
requestHideTooltip: function() {
this.waterfallDown("onRequestHideTooltip");
}
});

// ProgressBar.js

enyo.kind({
name: "onyx.ProgressBar",
classes: "onyx-progress-bar",
published: {
progress: 0,
min: 0,
max: 100,
barClasses: "",
showStripes: !0,
animateStripes: !0
},
events: {
onAnimateProgressFinish: ""
},
components: [ {
name: "progressAnimator",
kind: "Animator",
onStep: "progressAnimatorStep",
onEnd: "progressAnimatorComplete"
}, {
name: "bar",
classes: "onyx-progress-bar-bar"
} ],
create: function() {
this.inherited(arguments), this.progressChanged(), this.barClassesChanged(), this.showStripesChanged(), this.animateStripesChanged();
},
barClassesChanged: function(e) {
this.$.bar.removeClass(e), this.$.bar.addClass(this.barClasses);
},
showStripesChanged: function() {
this.$.bar.addRemoveClass("striped", this.showStripes);
},
animateStripesChanged: function() {
this.$.bar.addRemoveClass("animated", this.animateStripes);
},
progressChanged: function() {
this.progress = this.clampValue(this.min, this.max, this.progress);
var e = this.calcPercent(this.progress);
this.updateBarPosition(e);
},
clampValue: function(e, t, n) {
return Math.max(e, Math.min(n, t));
},
calcRatio: function(e) {
return (e - this.min) / (this.max - this.min);
},
calcPercent: function(e) {
return this.calcRatio(e) * 100;
},
updateBarPosition: function(e) {
this.$.bar.applyStyle("width", e + "%");
},
animateProgressTo: function(e) {
this.$.progressAnimator.play({
startValue: this.progress,
endValue: e,
node: this.hasNode()
});
},
progressAnimatorStep: function(e) {
return this.setProgress(e.value), !0;
},
progressAnimatorComplete: function(e) {
return this.doAnimateProgressFinish(e), !0;
}
});

// ProgressButton.js

enyo.kind({
name: "onyx.ProgressButton",
kind: "onyx.ProgressBar",
classes: "onyx-progress-button",
events: {
onCancel: ""
},
components: [ {
name: "progressAnimator",
kind: "Animator",
onStep: "progressAnimatorStep",
onEnd: "progressAnimatorComplete"
}, {
name: "bar",
classes: "onyx-progress-bar-bar onyx-progress-button-bar"
}, {
name: "client",
classes: "onyx-progress-button-client"
}, {
kind: "onyx.Icon",
src: "$lib/onyx/images/progress-button-cancel.png",
classes: "onyx-progress-button-icon",
ontap: "cancelTap"
} ],
cancelTap: function() {
this.doCancel();
}
});

// Scrim.js

enyo.kind({
name: "onyx.Scrim",
showing: !1,
classes: "onyx-scrim enyo-fit",
floating: !1,
create: function() {
this.inherited(arguments), this.zStack = [], this.floating && this.setParent(enyo.floatingLayer);
},
showingChanged: function() {
this.floating && this.showing && !this.hasNode() && this.render(), this.inherited(arguments);
},
addZIndex: function(e) {
enyo.indexOf(e, this.zStack) < 0 && this.zStack.push(e);
},
removeZIndex: function(e) {
enyo.remove(e, this.zStack);
},
showAtZIndex: function(e) {
this.addZIndex(e), e !== undefined && this.setZIndex(e), this.show();
},
hideAtZIndex: function(e) {
this.removeZIndex(e);
if (!this.zStack.length) this.hide(); else {
var t = this.zStack[this.zStack.length - 1];
this.setZIndex(t);
}
},
setZIndex: function(e) {
this.zIndex = e, this.applyStyle("z-index", e);
},
make: function() {
return this;
}
}), enyo.kind({
name: "onyx.scrimSingleton",
kind: null,
constructor: function(e, t) {
this.instanceName = e, enyo.setObject(this.instanceName, this), this.props = t || {};
},
make: function() {
var e = new onyx.Scrim(this.props);
return enyo.setObject(this.instanceName, e), e;
},
showAtZIndex: function(e) {
var t = this.make();
t.showAtZIndex(e);
},
hideAtZIndex: enyo.nop,
show: function() {
var e = this.make();
e.show();
}
}), new onyx.scrimSingleton("onyx.scrim", {
floating: !0,
classes: "onyx-scrim-translucent"
}), new onyx.scrimSingleton("onyx.scrimTransparent", {
floating: !0,
classes: "onyx-scrim-transparent"
});

// Slider.js

enyo.kind({
name: "onyx.Slider",
kind: "onyx.ProgressBar",
classes: "onyx-slider",
published: {
value: 0,
lockBar: !0,
tappable: !0
},
events: {
onChange: "",
onChanging: "",
onAnimateFinish: ""
},
showStripes: !1,
handlers: {
ondragstart: "dragstart",
ondrag: "drag",
ondragfinish: "dragfinish"
},
moreComponents: [ {
kind: "Animator",
onStep: "animatorStep",
onEnd: "animatorComplete"
}, {
classes: "onyx-slider-taparea"
}, {
name: "knob",
classes: "onyx-slider-knob"
} ],
create: function() {
this.inherited(arguments), this.createComponents(this.moreComponents), this.valueChanged();
},
valueChanged: function() {
this.value = this.clampValue(this.min, this.max, this.value);
var e = this.calcPercent(this.value);
this.updateKnobPosition(e), this.lockBar && this.setProgress(this.value);
},
updateKnobPosition: function(e) {
this.$.knob.applyStyle("left", e + "%");
},
calcKnobPosition: function(e) {
var t = e.clientX - this.hasNode().getBoundingClientRect().left;
return t / this.getBounds().width * (this.max - this.min) + this.min;
},
dragstart: function(e, t) {
if (t.horizontal) return t.preventDefault(), this.dragging = !0, !0;
},
drag: function(e, t) {
if (this.dragging) {
var n = this.calcKnobPosition(t);
return this.setValue(n), this.doChanging({
value: this.value
}), !0;
}
},
dragfinish: function(e, t) {
return this.dragging = !1, t.preventTap(), this.doChange({
value: this.value
}), !0;
},
tap: function(e, t) {
if (this.tappable) {
var n = this.calcKnobPosition(t);
return this.tapped = !0, this.animateTo(n), !0;
}
},
animateTo: function(e) {
this.$.animator.play({
startValue: this.value,
endValue: e,
node: this.hasNode()
});
},
animatorStep: function(e) {
return this.setValue(e.value), !0;
},
animatorComplete: function(e) {
return this.tapped && (this.tapped = !1, this.doChange({
value: this.value
})), this.doAnimateFinish(e), !0;
}
});

// Item.js

enyo.kind({
name: "onyx.Item",
classes: "onyx-item",
tapHighlight: !0,
handlers: {
onhold: "hold",
onrelease: "release"
},
hold: function(e, t) {
this.tapHighlight && onyx.Item.addFlyweightClass(this.controlParent || this, "onyx-highlight", t);
},
release: function(e, t) {
this.tapHighlight && onyx.Item.removeFlyweightClass(this.controlParent || this, "onyx-highlight", t);
},
statics: {
addFlyweightClass: function(e, t, n, r) {
var i = n.flyweight;
if (i) {
var s = r != undefined ? r : n.index;
i.performOnRow(s, function() {
e.hasClass(t) ? e.setClassAttribute(e.getClassAttribute()) : e.addClass(t);
}), e.removeClass(t);
}
},
removeFlyweightClass: function(e, t, n, r) {
var i = n.flyweight;
if (i) {
var s = r != undefined ? r : n.index;
i.performOnRow(s, function() {
e.hasClass(t) ? e.removeClass(t) : e.setClassAttribute(e.getClassAttribute());
});
}
}
}
});

// Spinner.js

enyo.kind({
name: "onyx.Spinner",
classes: "onyx-spinner",
stop: function() {
this.setShowing(!1);
},
start: function() {
this.setShowing(!0);
},
toggle: function() {
this.setShowing(!this.getShowing());
}
});

// MoreToolbar.js

enyo.kind({
name: "onyx.MoreToolbar",
classes: "onyx-toolbar onyx-more-toolbar",
menuClass: "",
movedClass: "",
layoutKind: "FittableColumnsLayout",
noStretch: !0,
handlers: {
onHide: "reflow"
},
published: {
clientLayoutKind: "FittableColumnsLayout"
},
tools: [ {
name: "client",
fit: !0,
noStretch: !0,
classes: "onyx-toolbar-inline"
}, {
name: "nard",
kind: "onyx.MenuDecorator",
showing: !1,
onActivate: "activated",
components: [ {
kind: "onyx.IconButton",
classes: "onyx-more-button"
}, {
name: "menu",
kind: "onyx.Menu",
scrolling: !1,
classes: "onyx-more-menu",
prepend: !0
} ]
} ],
initComponents: function() {
this.menuClass && this.menuClass.length > 0 && !this.$.menu.hasClass(this.menuClass) && this.$.menu.addClass(this.menuClass), this.createChrome(this.tools), this.inherited(arguments), this.$.client.setLayoutKind(this.clientLayoutKind);
},
clientLayoutKindChanged: function() {
this.$.client.setLayoutKind(this.clientLayoutKind);
},
reflow: function() {
this.inherited(arguments), this.isContentOverflowing() ? (this.$.nard.show(), this.popItem() && this.reflow()) : this.tryPushItem() ? this.reflow() : this.$.menu.children.length || (this.$.nard.hide(), this.$.menu.hide());
},
activated: function(e, t) {
this.addRemoveClass("active", t.originator.active);
},
popItem: function() {
var e = this.findCollapsibleItem();
if (e) {
this.movedClass && this.movedClass.length > 0 && !e.hasClass(this.movedClass) && e.addClass(this.movedClass), this.$.menu.addChild(e);
var t = this.$.menu.hasNode();
return t && e.hasNode() && e.insertNodeInParent(t), !0;
}
},
pushItem: function() {
var e = this.$.menu.children, t = e[0];
if (t) {
this.movedClass && this.movedClass.length > 0 && t.hasClass(this.movedClass) && t.removeClass(this.movedClass), this.$.client.addChild(t);
var n = this.$.client.hasNode();
if (n && t.hasNode()) {
var r = undefined, i;
for (var s = 0; s < this.$.client.children.length; s++) {
var o = this.$.client.children[s];
if (o.toolbarIndex != undefined && o.toolbarIndex != s) {
r = o, i = s;
break;
}
}
if (r && r.hasNode()) {
t.insertNodeInParent(n, r.node);
var u = this.$.client.children.pop();
this.$.client.children.splice(i, 0, u);
} else t.appendNodeToParent(n);
}
return !0;
}
},
tryPushItem: function() {
if (this.pushItem()) {
if (!this.isContentOverflowing()) return !0;
this.popItem();
}
},
isContentOverflowing: function() {
if (this.$.client.hasNode()) {
var e = this.$.client.children, t = e[e.length - 1].hasNode();
if (t) return this.$.client.reflow(), t.offsetLeft + t.offsetWidth > this.$.client.node.clientWidth;
}
},
findCollapsibleItem: function() {
var e = this.$.client.children;
for (var t = e.length - 1; c = e[t]; t--) {
if (!c.unmoveable) return c;
c.toolbarIndex == undefined && (c.toolbarIndex = t);
}
}
});

// AutoComplete.js

enyo.kind({
name: "GTS.AutoComplete",
kind: "onyx.InputDecorator",
classes: "gts-autocomplete",
active: !1,
values: "",
published: {
enabled: !0,
limit: 50,
delay: 200,
icon: "assets/search.png",
zIndex: !1,
allowDirty: !0
},
events: {
onDataRequested: "",
onInputChanged: "",
onValueSelected: ""
},
components: [ {
name: "options",
kind: "onyx.Menu",
floating: !0
}, {
name: "icon",
classes: "search-icon"
} ],
handlers: {
oninput: "inputChanged",
onSelect: "itemSelected"
},
rendered: function() {
this.inherited(arguments), this.enabledChanged(), this.iconChanged(), this.zIndexChanged();
},
enabledChanged: function() {
this.iconChanged();
},
iconChanged: function() {
this.$.icon.applyStyle("background-image", this.icon), this.$.icon.setShowing(this.enabled && this.icon != "");
},
zIndexChanged: function() {
this.zIndex !== !1 ? this.$.options.applyStyle("z-index", this.zIndex) : this.$.options.applyStyle("z-index", null);
},
inputChanged: function(e, t) {
if (!this.enabled) return;
this.inputField = this.inputField || t.originator, enyo.job(null, enyo.bind(this, "fireInputChanged"), this.delay);
},
fireInputChanged: function() {
this.searchValue = this.inputField.getValue(), this.doInputChanged({
value: this.inputField.getValue()
});
if (this.searchValue.length <= 0) {
this.waterfall("onRequestHideMenu", {
activator: this
});
return;
}
this.doDataRequested({
value: this.inputField.getValue(),
callback: enyo.bind(this, this.buildSuggestionList, this.searchValue)
});
},
buildSuggestionList: function(e, t) {
if (this.searchValue !== e) return;
this.values = t.slice(0, this.limit);
if (!this.values || this.values.length === 0) {
this.waterfall("onRequestHideMenu", {
activator: this
});
return;
}
this.$.options.destroyClientControls();
var n = [];
for (var r = 0; r < this.values.length; r++) n.push({
content: this.values[r],
index: r,
allowHtml: !0
});
this.$.options.createComponents(n), this.$.options.render(), this.waterfall("onRequestShowMenu", {
activator: this
}), this.log(this);
},
itemSelected: function(e, t) {
t.content && t.content.length > 0 && (t.content = this.dirtyString(t.content), this.inputField.setValue(t.content)), this.doValueSelected(enyo.mixin(t, {
value: this.inputField.getValue()
}));
},
dirtyString: function(e) {
if (!this.allowDirty) return e;
var t = [ /&amp;/g, /&quot;/g, /$lt;/g, /&gt;/g, /&rsquo;/g, /&nbsp;/g ], n = [ "&", '"', "<", ">", "'", " " ];
for (var r = 0; r < n.length; r++) e = e.replace(t[r], n[r]);
return e;
}
});

// ConfirmDialog.js

enyo.kind({
name: "gts.ConfirmDialog",
kind: "onyx.Popup",
classes: "gts-confirm-dialog",
baseButtonClasses: "",
published: {
title: "",
message: "",
confirmText: "confirm",
confirmClass: "onyx-affirmative",
cancelText: "cancel",
cancelClass: "onyx-negative",
centered: !0,
floating: !0,
modal: !0,
scrim: !0,
scrimclasses: "onyx-scrim-translucent",
autoDismiss: !1
},
events: {
onCancel: "",
onConfirm: ""
},
components: [ {
name: "title",
classes: "title-wrapper"
}, {
name: "message",
classes: "message-wrapper"
}, {
classes: "button-wrapper",
components: [ {
name: "cancelButton",
kind: "onyx.Button",
ontap: "cancel",
showing: !1
}, {
name: "confirmButton",
kind: "onyx.Button",
ontap: "confirm"
} ]
} ],
rendered: function() {
this.inherited(arguments), this.baseButtonClasses = this.$.confirmButton.getClassAttribute(), this.titleChanged(), this.messageChanged(), this.confirmTextChanged(), this.cancelTextChanged(), this.confirmClassChanged(), this.cancelClassChanged();
},
titleChanged: function() {
this.$.title.setContent(this.title);
},
messageChanged: function() {
this.$.message.setContent(this.message);
},
confirmTextChanged: function() {
this.$.confirmButton.setContent(this.confirmText);
},
confirmClassChanged: function() {
this.$.confirmButton.setClassAttribute(this.baseButtonClasses + " " + this.confirmClass);
},
cancelTextChanged: function() {
this.$.cancelButton.setContent(this.cancelText), this.cancelText.length === 0 ? this.$.cancelButton.hide() : this.$.cancelButton.show();
},
cancelClassChanged: function() {
this.$.cancelButton.setClassAttribute(this.baseButtonClasses + " " + this.cancelClass);
},
cancel: function(e, t) {
this.doCancel(t), this.hide();
},
confirm: function(e, t) {
this.doConfirm(t), this.hide();
}
});

// DatePicker.js

enyo.kind({
name: "GTS.DatePicker",
kind: "enyo.Control",
classes: "gts-calendar",
published: {
value: null,
viewDate: null,
dowFormat: "ddd",
monthFormat: "mmmm yyyy"
},
events: {
onChange: ""
},
components: [ {
kind: "FittableColumns",
components: [ {
kind: "onyx.Button",
content: "<<",
ontap: "monthBack"
}, {
name: "monthLabel",
tag: "strong",
classes: "month-label",
fit: !0
}, {
kind: "onyx.Button",
content: ">>",
ontap: "monthForward"
} ]
}, {
kind: "FittableColumns",
components: [ {
name: "sunday",
content: "Sun",
classes: "week-label"
}, {
name: "monday",
content: "Mon",
classes: "week-label"
}, {
name: "tuesday",
content: "Tue",
classes: "week-label"
}, {
name: "wednesday",
content: "Wed",
classes: "week-label"
}, {
name: "thursday",
content: "Thu",
classes: "week-label"
}, {
name: "friday",
content: "Fri",
classes: "week-label"
}, {
name: "saturday",
content: "Sat",
classes: "week-label"
} ]
}, {
kind: "FittableColumns",
components: [ {
name: "row0col0",
kind: "onyx.Button",
ontap: "dateHandler"
}, {
name: "row0col1",
kind: "onyx.Button",
ontap: "dateHandler"
}, {
name: "row0col2",
kind: "onyx.Button",
ontap: "dateHandler"
}, {
name: "row0col3",
kind: "onyx.Button",
ontap: "dateHandler"
}, {
name: "row0col4",
kind: "onyx.Button",
ontap: "dateHandler"
}, {
name: "row0col5",
kind: "onyx.Button",
ontap: "dateHandler"
}, {
name: "row0col6",
kind: "onyx.Button",
ontap: "dateHandler"
} ]
}, {
kind: "FittableColumns",
components: [ {
name: "row1col0",
kind: "onyx.Button",
ontap: "dateHandler"
}, {
name: "row1col1",
kind: "onyx.Button",
ontap: "dateHandler"
}, {
name: "row1col2",
kind: "onyx.Button",
ontap: "dateHandler"
}, {
name: "row1col3",
kind: "onyx.Button",
ontap: "dateHandler"
}, {
name: "row1col4",
kind: "onyx.Button",
ontap: "dateHandler"
}, {
name: "row1col5",
kind: "onyx.Button",
ontap: "dateHandler"
}, {
name: "row1col6",
kind: "onyx.Button",
ontap: "dateHandler"
} ]
}, {
kind: "FittableColumns",
components: [ {
name: "row2col0",
kind: "onyx.Button",
ontap: "dateHandler"
}, {
name: "row2col1",
kind: "onyx.Button",
ontap: "dateHandler"
}, {
name: "row2col2",
kind: "onyx.Button",
ontap: "dateHandler"
}, {
name: "row2col3",
kind: "onyx.Button",
ontap: "dateHandler"
}, {
name: "row2col4",
kind: "onyx.Button",
ontap: "dateHandler"
}, {
name: "row2col5",
kind: "onyx.Button",
ontap: "dateHandler"
}, {
name: "row2col6",
kind: "onyx.Button",
ontap: "dateHandler"
} ]
}, {
kind: "FittableColumns",
components: [ {
name: "row3col0",
kind: "onyx.Button",
ontap: "dateHandler"
}, {
name: "row3col1",
kind: "onyx.Button",
ontap: "dateHandler"
}, {
name: "row3col2",
kind: "onyx.Button",
ontap: "dateHandler"
}, {
name: "row3col3",
kind: "onyx.Button",
ontap: "dateHandler"
}, {
name: "row3col4",
kind: "onyx.Button",
ontap: "dateHandler"
}, {
name: "row3col5",
kind: "onyx.Button",
ontap: "dateHandler"
}, {
name: "row3col6",
kind: "onyx.Button",
ontap: "dateHandler"
} ]
}, {
kind: "FittableColumns",
components: [ {
name: "row4col0",
kind: "onyx.Button",
ontap: "dateHandler"
}, {
name: "row4col1",
kind: "onyx.Button",
ontap: "dateHandler"
}, {
name: "row4col2",
kind: "onyx.Button",
ontap: "dateHandler"
}, {
name: "row4col3",
kind: "onyx.Button",
ontap: "dateHandler"
}, {
name: "row4col4",
kind: "onyx.Button",
ontap: "dateHandler"
}, {
name: "row4col5",
kind: "onyx.Button",
ontap: "dateHandler"
}, {
name: "row4col6",
kind: "onyx.Button",
ontap: "dateHandler"
} ]
}, {
kind: "FittableColumns",
components: [ {
name: "row5col0",
kind: "onyx.Button",
ontap: "dateHandler"
}, {
name: "row5col1",
kind: "onyx.Button",
ontap: "dateHandler"
}, {
name: "row5col2",
kind: "onyx.Button",
ontap: "dateHandler"
}, {
name: "row5col3",
kind: "onyx.Button",
ontap: "dateHandler"
}, {
name: "row5col4",
kind: "onyx.Button",
ontap: "dateHandler"
}, {
name: "row5col5",
kind: "onyx.Button",
ontap: "dateHandler"
}, {
name: "row5col6",
kind: "onyx.Button",
ontap: "dateHandler"
} ]
}, {
kind: "FittableColumns",
style: "margin-top: 1em;",
components: [ {
name: "client",
fit: !0
}, {
kind: "onyx.Button",
content: "Today",
ontap: "resetDate"
} ]
} ],
constructor: function() {
this.inherited(arguments), this.viewDate = this.viewDate || new Date, this.value = this.value || new Date;
},
rendered: function() {
this.inherited(arguments);
if (dateFormat) {
var e = new Date(2011, 4, 1);
this.$.sunday.setContent(dateFormat(e, this.dowFormat)), e.setDate(e.getDate() + 1), this.$.monday.setContent(dateFormat(e, this.dowFormat)), e.setDate(e.getDate() + 1), this.$.tuesday.setContent(dateFormat(e, this.dowFormat)), e.setDate(e.getDate() + 1), this.$.wednesday.setContent(dateFormat(e, this.dowFormat)), e.setDate(e.getDate() + 1), this.$.thursday.setContent(dateFormat(e, this.dowFormat)), e.setDate(e.getDate() + 1), this.$.friday.setContent(dateFormat(e, this.dowFormat)), e.setDate(e.getDate() + 1), this.$.saturday.setContent(dateFormat(e, this.dowFormat));
}
var t = Math.round(10 * this.getBounds().width / 7) / 10;
this.$.sunday.applyStyle("width", t + "px"), this.$.monday.applyStyle("width", t + "px"), this.$.tuesday.applyStyle("width", t + "px"), this.$.wednesday.applyStyle("width", t + "px"), this.$.thursday.applyStyle("width", t + "px"), this.$.friday.applyStyle("width", t + "px"), this.$.saturday.applyStyle("width", t + "px"), this.valueChanged();
},
valueChanged: function() {
if (Object.prototype.toString.call(this.value) !== "[object Date]" || isNaN(this.value.getTime())) this.value = new Date;
this.viewDate.setTime(this.value.getTime()), this.renderCalendar();
},
viewDateChanged: function() {
this.renderCalendar();
},
renderCalendar: function() {
var e = Math.round(10 * this.getBounds().width / 7) / 10, t = new Date;
this.viewDate = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth(), 1);
var n = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth(), 0), r = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth(), 1);
n.setDate(n.getDate() - r.getDay() + 1), n.getTime() === r.getTime() && n.setDate(n.getDate() - 7);
var i = 0, s;
while (i < 6) n.getDate() === this.value.getDate() && n.getMonth() === this.value.getMonth() && n.getFullYear() === this.value.getFullYear() ? s = "onyx-blue" : n.getDate() === t.getDate() && n.getMonth() === t.getMonth() && n.getFullYear() === t.getFullYear() ? s = "onyx-affirmative" : n.getMonth() !== r.getMonth() ? s = "onyx-dark" : s = "", this.$["row" + i + "col" + n.getDay()].applyStyle("width", e + "px"), this.$["row" + i + "col" + n.getDay()].removeClass("onyx-affirmative"), this.$["row" + i + "col" + n.getDay()].removeClass("onyx-blue"), this.$["row" + i + "col" + n.getDay()].removeClass("onyx-dark"), this.$["row" + i + "col" + n.getDay()].addClass(s), this.$["row" + i + "col" + n.getDay()].setContent(n.getDate()), this.$["row" + i + "col" + n.getDay()].ts = n.getTime(), n.setDate(n.getDate() + 1), n.getDay() === 0 && i < 6 && i++;
dateFormat ? this.$.monthLabel.setContent(dateFormat(r, this.monthFormat)) : this.$.monthLabel.setContent(this.getMonthString(r.getMonth()));
},
monthBack: function() {
this.viewDate.setMonth(this.viewDate.getMonth() - 1), this.renderCalendar();
},
monthForward: function() {
this.viewDate.setMonth(this.viewDate.getMonth() + 1), this.renderCalendar();
},
resetDate: function() {
this.viewDate = new Date, this.value = new Date, this.renderCalendar(), this.doChange(this.value);
},
dateHandler: function(e, t) {
var n = new Date;
n.setTime(e.ts), this.value.setDate(n.getDate()), this.value.setMonth(n.getMonth()), this.value.setFullYear(n.getFullYear()), this.value.getMonth() != this.viewDate.getMonth() && (this.viewDate = new Date(this.value.getFullYear(), this.value.getMonth(), 1)), this.doChange(this.value), this.renderCalendar();
},
getMonthString: function(e) {
return [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ][e];
},
getDayString: function(e) {
return [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ][e];
}
});

// DecimalInput.js

enyo.kind({
name: "GTS.DecimalInput",
kind: "Input",
classes: "gts-decimal-input",
deleteAction: !1,
oldType: "",
published: {
type: "number",
placeholder: "0.00",
min: 0,
max: !1,
step: !0,
precision: 2,
atm: !1,
selectAllOnFocus: !1
},
handlers: {
onkeypress: "filterInput",
oninput: "inputValueUpdated",
onchange: "inputValueChanged",
onfocus: "inputFocused",
onblur: "inputBlurred"
},
rendered: function() {
this.inherited(arguments), this.minChanged(), this.maxChanged(), this.precisionChanged(), this.inputBlurred();
},
minChanged: function() {
this.setAttribute("min", this.min);
},
maxChanged: function() {
this.max !== !1 && this.setAttribute("max", this.max);
},
stepChanged: function() {
this.precisionChanged();
},
precisionChanged: function() {
if (!this.step) {
this.setAttribute("step", null);
return;
}
var e = "0.";
if (this.precision <= 0) e = "1"; else {
for (var t = 0; t < this.precision - 1; t++) e += "0";
e += "1";
}
this.setAttribute("step", e);
},
filterInput: function(e, t) {
!(t.keyCode >= 48 && t.keyCode <= 57) && t.keyCode !== 46 && t.preventDefault();
},
inputValueUpdated: function(e, t) {
if (this.atm) {
var n = this.getValue();
n = n.replace(/[^0-9]/g, ""), n = n.replace(/^0*/, ""), n = parseInt(n) / Math.pow(10, this.precision), isNaN(n) && (n = 0), n = n.toFixed(this.precision), this.setValue(n);
var r = this.hasNode();
if (r) {
var i = n.length;
enyo.asyncMethod(r, r.setSelectionRange, i, i);
}
}
},
inputValueChanged: function(e, t) {
var n = this.getValueAsNumber();
this.max !== !1 && n > this.max ? n = this.max : n < this.min && (n = this.min), this.setValue(n);
},
inputFocused: function(e, t) {
this.oldType === "number" && this.setType(this.oldType), this.selectAllOnFocus && this.hasNode() && this.hasNode().setSelectionRange(0, this.getValue().length);
},
inputBlurred: function(e, t) {
this.oldType = this.type, this.oldType === "number" && this.setType("text");
},
getValueAsNumber: function() {
var e = this.getValue().replace(/^\s\s*/, "").replace(/\s\s*$/, "").replace(/[^0-9\.]/g, "");
return e = parseFloat(e, 10).toFixed(this.precision), isNaN(e) && (e = 0), e;
}
});

// Divider.js

enyo.kind({
name: "GTS.Divider",
classes: "gts-Divider",
published: {
content: ""
},
components: [ {
name: "base",
kind: "enyo.FittableColumns",
noStretch: !0,
classes: "base-bar",
components: [ {
classes: "end-cap bar"
}, {
name: "caption",
classes: "caption"
}, {
classes: "bar",
fit: !0
} ]
} ],
rendered: function() {
this.inherited(arguments), this.contentChanged();
},
reflow: function() {
this.$.base.reflow();
},
contentChanged: function() {
this.$.caption.setContent(this.content), this.$.caption.applyStyle("display", this.content ? "" : "none"), this.reflow();
}
});

// DividerDrawer.js

enyo.kind({
name: "GTS.DividerDrawer",
classes: "gts-DividerDrawer",
published: {
caption: "",
open: !0
},
events: {
onChange: ""
},
components: [ {
name: "base",
kind: "enyo.FittableColumns",
noStretch: !0,
classes: "base-bar",
ontap: "toggleOpen",
components: [ {
classes: "end-cap"
}, {
name: "caption",
classes: "caption"
}, {
classes: "bar",
fit: !0
}, {
name: "switch",
classes: "toggle",
value: !1
}, {
classes: "end-cap bar"
} ]
}, {
name: "client",
kind: "onyx.Drawer"
} ],
rendered: function() {
this.inherited(arguments), this.captionChanged(), this.openChanged();
},
reflow: function() {
this.$.base.reflow();
},
openChanged: function() {
this.$["switch"].value = this.open, this.$.client.setOpen(this.$["switch"].value), this.$["switch"].addRemoveClass("checked", this.$["switch"].value), this.reflow();
},
captionChanged: function() {
this.$.caption.setContent(this.caption), this.$.caption.applyStyle("display", this.caption ? "" : "none"), this.reflow();
},
toggleOpen: function(e, t) {
return this.open = !this.$["switch"].value, this.$["switch"].value = this.open, this.openChanged(), this.doChange(this, {
caption: this.getCaption(),
open: this.getOpen()
}), !0;
}
});

// gapi.js

enyo.kind({
name: "GTS.Gapi",
nextSteps: {},
published: {
apiKey: "",
clientId: "",
clientSecret: "",
scope: [],
gapiConfig: {
endpoint: "https://accounts.google.com/o/oauth2/auth",
endtoken: "https://accounts.google.com/o/oauth2/token",
response_type: "code",
redirect_uri: "http://localhost",
accessTokenExpireLimit: 348e4,
grantTypes: {
AUTHORIZE: "authorization_code",
REFRESH: "refresh_token"
},
access_type: "offline",
state: "lligtaskinit"
}
},
events: {
onReady: ""
},
constructor: function() {
this.inherited(arguments), this._binds = {
_cbUrlChanged: enyo.bind(this, this.cbUrlChanged),
_handleAuthResult: enyo.bind(this, this.handleAuthResult)
};
},
create: function() {
this.inherited(arguments), this.isGapiReady() ? (this.doReady(), this.apiKeyChanged()) : this.loadGapi();
},
isGapiReady: function() {
return typeof gapi != "undefined";
},
loadGapi: function() {
(new enyo.JsonpRequest({
url: "https://apis.google.com/js/client.js",
callbackName: "onload"
})).go().response(this, "gapiLoaded");
},
gapiLoaded: function() {
this.apiKey != "" && this.apiKeyChanged(), this.doReady();
},
apiKeyChanged: function() {
gapi.client.setApiKey(this.apiKey);
},
getAuthToken: function() {
return gapi.auth.getToken();
},
setAuthToken: function(e) {
return gapi.auth.setToken(e);
},
auth: function(e) {
this.nextSteps = e;
if (window.device && window.plugins.childBrowser) {
var t = this.getAuthToken();
this.log("Phonegap-ChildBrowsers Auth");
var n = {
client_id: encodeURIComponent(this.clientId),
scope: encodeURIComponent(this.scope.join(" ")),
redirect_uri: encodeURIComponent(this.gapiConfig.redirect_uri),
response_type: encodeURIComponent(this.gapiConfig.response_type),
state: encodeURIComponent(this.gapiConfig.state),
access_type: encodeURIComponent(this.gapiConfig.access_type),
approval_prompt: "force"
}, r = this.gapiConfig.endpoint + "?" + Object.keys(n).map(function(e) {
return e + "=" + n[e];
}).join("&");
window.plugins.childBrowser.onClose = function() {}, window.plugins.childBrowser.onLocationChange = this._binds._cbUrlChanged, window.plugins.childBrowser.showWebPage(r, {
showLocationBar: !1
});
} else gapi.auth.authorize({
client_id: this.clientId,
scope: this.scope.join(" "),
immediate: !0
}, this._binds._handleAuthResult);
},
cbUrlChanged: function(e) {
if (e.indexOf("code=") != -1) {
this.log("Authenticated");
var t = this.getParameterByName("code", e);
enyo.job("refreshFromUrlChange", enyo.bind(this, this.getRefreshToken, t, this.nextSteps), 1e3), window.plugins.childBrowser.close();
} else if (e.indexOf("error=") != -1) {
window.plugins.childBrowser.close();
if (enyo.isFunction(this.nextSteps.onError)) {
this.nextSteps.onError(this.getParameterByName("error", e));
return;
}
} else this.log("Status unknown: " + e);
},
getParameterByName: function(e, t) {
e = e.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
var n = new RegExp("[\\?&]" + e + "=([^&#]*)"), r = n.exec(t);
return r == null ? !1 : decodeURIComponent(r[1].replace(/\+/g, " "));
},
getAccessToken: function(e) {
this.log("Update token"), this.nextSteps = {};
var t = (new Date).getTime(), n = this.getAuthToken();
if (n && n.access_token && t < n.expires_in + this.gapiConfig.accessTokenExpireLimit) {
enyo.isFunction(e.onSuccess) && e.onSuccess();
return;
}
this.log("Fetching fresh token");
var r = new enyo.Ajax({
url: this.gapiConfig.endtoken,
method: "POST"
});
r.go({
client_id: this.clientId,
client_secret: this.clientSecret,
refresh_token: n.access_token,
redirect_uri: this.gapiConfig.redirect_uri,
grant_type: this.gapiConfig.grantTypes.AUTHORIZE
}), r.response(this, function(t, n) {
this.log("Access complete");
var r = {
access_token: n.access_token
};
return this.setAuthToken(r), n.error = !1, enyo.isFunction(e.onSuccess) && e.onSuccess(n), !0;
}), r.error(this, function(t, n) {
return this.log("Access error"), enyo.isFunction(e.onError) && (n.error = !0, e.onError(n)), !0;
});
},
getRefreshToken: function(e, t) {
this.log("Refresh token");
var n = new enyo.Ajax({
url: this.gapiConfig.endtoken,
method: "POST"
});
n.go({
code: e,
client_id: this.clientId,
client_secret: this.clientSecret,
redirect_uri: this.gapiConfig.redirect_uri,
grant_type: this.gapiConfig.grantTypes.AUTHORIZE
}), n.response(this, function(e, n) {
return this.log("Refresh complete"), this.setAuthToken(n), enyo.isFunction(t.onSuccess) && t.onSuccess(n), !0;
}), n.error(this, function(e, n) {
return this.log("Refresh error", enyo.json.stringify(n)), enyo.isFunction(t.onError) && (n.error = !0, t.onError(n)), !0;
});
},
handleAuthResult: function(e) {
this.$.authPop && (this.$.authPop.hide(), this.$.authPop.destroy());
if (e && !e.error) enyo.isFunction(this.nextSteps.onSuccess) && this.nextSteps.onSuccess(); else {
var t = {
name: "authPop",
kind: "onyx.Popup",
centered: !0,
floating: !0,
modal: !0,
scrim: !0,
components: [ {
content: "Authenticate with Google",
classes: "margin-half-bottom bigger text-center"
}, {
classes: "text-center",
components: [ {
kind: "onyx.Button",
content: "Cancel",
ontap: "handleAuthAbort",
classes: "onyx-negative",
style: "margin-right: 15px;"
}, {
kind: "onyx.Button",
content: "Authenticate",
onclick: "handleAuthClick",
classes: "onyx-affirmative"
} ]
} ]
};
this.createComponent(t), this.render(), this.$.authPop.show();
var n = this.$.authPop.getComputedStyleValue("zIndex");
if (!n) {
var r = this.$.authPop.domCssText.split(";");
for (var i = 0; i < r.length; i++) if (r[i].match("z-index")) {
r = r[i].split(":"), n = r[1];
break;
}
}
this.$.authPop.applyStyle("z-index", n - 5 + 10), this.$.authPop.reflow();
}
},
handleAuthAbort: function() {
this.$.authPop.hide(), enyo.isFunction(this.nextSteps.onError) && this.nextSteps.onError();
},
handleAuthClick: function() {
gapi.auth.authorize({
client_id: this.clientId,
scope: this.scope.join(" "),
immediate: !1
}, this._binds._handleAuthResult);
},
loadModule: function(e, t, n) {
if (!this.isGapiReady()) {
n.onError({
message: "Google API not ready yet."
});
return;
}
typeof gapi.client[e] == "undefined" ? gapi.client.load(e, "v" + t, n.onSuccess) : enyo.isFunction(n.onSuccess) && n.onSuccess();
}
});

// InlineNotification.js

enyo.kind({
name: "GTS.InlineNotification",
classes: "inline-notification",
content: "",
allowHtml: !0,
typeOptions: [ "add", "error", "info", "search", "success", "success-blue", "warning" ],
published: {
type: "error",
icon: !0
},
rendered: function() {
this.inherited(arguments), this.typeChanged(), this.iconChanged();
},
typeChanged: function() {
for (var e = 0; e < this.typeOptions.length; e++) this.addRemoveClass(this.typeOptions[e], this.typeOptions[e] === this.type);
},
iconChanged: function() {
this.addRemoveClass("no-image", !this.icon);
}
});

// Canvas.js

enyo.kind({
name: "enyo.Canvas",
kind: enyo.Control,
tag: "canvas",
attributes: {
width: 500,
height: 500
},
defaultKind: "enyo.canvas.Control",
generateInnerHtml: function() {
return "";
},
teardownChildren: function() {},
rendered: function() {
this.renderChildren();
},
addChild: function() {
enyo.UiComponent.prototype.addChild.apply(this, arguments);
},
removeChild: function() {
enyo.UiComponent.prototype.removeChild.apply(this, arguments);
},
renderChildren: function(e) {
var t = e, n = this.hasNode();
t || n.getContext && (t = n.getContext("2d"));
if (t) for (var r = 0, i; i = this.children[r]; r++) i.render(t);
},
update: function() {
var e = this.hasNode();
if (e.getContext) {
var t = e.getContext("2d"), n = this.getBounds();
t.clearRect(0, 0, n.width, n.height), this.renderChildren(t);
}
}
});

// CanvasControl.js

enyo.kind({
name: "enyo.canvas.Control",
kind: enyo.UiComponent,
defaultKind: "enyo.canvas.Control",
published: {
bounds: null
},
events: {
onRender: ""
},
constructor: function() {
this.bounds = {
l: enyo.irand(400),
t: enyo.irand(400),
w: enyo.irand(100),
h: enyo.irand(100)
}, this.inherited(arguments);
},
importProps: function(e) {
this.inherited(arguments), e.bounds && (enyo.mixin(this.bounds, e.bounds), delete e.bounds);
},
renderSelf: function(e) {
this.doRender({
context: e
});
},
render: function(e) {
this.children.length ? this.renderChildren(e) : this.renderSelf(e);
},
renderChildren: function(e) {
for (var t = 0, n; n = this.children[t]; t++) n.render(e);
}
});

// Shape.js

enyo.kind({
name: "enyo.canvas.Shape",
kind: enyo.canvas.Control,
published: {
color: "red",
outlineColor: ""
},
fill: function(e) {
e.fill();
},
outline: function(e) {
e.stroke();
},
draw: function(e) {
this.color && (e.fillStyle = this.color, this.fill(e)), this.outlineColor && (e.strokeStyle = this.outlineColor, this.outline(e));
}
});

// Circle.js

enyo.kind({
name: "enyo.canvas.Circle",
kind: enyo.canvas.Shape,
renderSelf: function(e) {
e.beginPath(), e.arc(this.bounds.l, this.bounds.t, this.bounds.w, 0, Math.PI * 2), this.draw(e);
}
});

// Rectangle.js

enyo.kind({
name: "enyo.canvas.Rectangle",
kind: enyo.canvas.Shape,
published: {
clear: !1
},
renderSelf: function(e) {
this.clear ? e.clearRect(this.bounds.l, this.bounds.t, this.bounds.w, this.bounds.h) : this.draw(e);
},
fill: function(e) {
e.fillRect(this.bounds.l, this.bounds.t, this.bounds.w, this.bounds.h);
},
outline: function(e) {
e.strokeRect(this.bounds.l, this.bounds.t, this.bounds.w, this.bounds.h);
}
});

// Text.js

enyo.kind({
name: "enyo.canvas.Text",
kind: enyo.canvas.Shape,
published: {
text: "",
font: "12pt Arial",
align: "left"
},
renderSelf: function(e) {
e.textAlign = this.align, e.font = this.font, this.draw(e);
},
fill: function(e) {
e.fillText(this.text, this.bounds.l, this.bounds.t);
},
outline: function(e) {
e.strokeText(this.text, this.bounds.l, this.bounds.t);
}
});

// Image.js

enyo.kind({
name: "enyo.canvas.Image",
kind: enyo.canvas.Control,
published: {
src: ""
},
create: function() {
this.image = new Image, this.inherited(arguments), this.srcChanged();
},
srcChanged: function() {
this.src && (this.image.src = this.src);
},
renderSelf: function(e) {
e.drawImage(this.image, this.bounds.l, this.bounds.t);
}
});

// Joystick.js

var GTS_Joystick_Touch_List = [];

enyo.kind({
name: "GTS.Joystick",
kind: "enyo.Canvas",
classes: "gts-joystick",
baseX: 0,
baseY: 0,
stickX: 0,
stickY: 0,
top: 0,
left: 0,
height: 0,
width: 0,
pressed: !1,
touchId: -1,
wasUp: !1,
wasDown: !1,
wasLeft: !1,
wasRight: !1,
wasPressed: !1,
published: {
absolutelyPositioned: !0,
padHeight: 300,
padWidth: 300,
baseColor: "#272D70",
stickRadius: 25,
stickColor: "#333333",
jitter: 12.5,
debug: ""
},
events: {
onStickMove: "",
onStickUp: "",
onStickDown: "",
onStickLeft: "",
onStickRight: "",
onStickCentered: ""
},
components: [ {
name: "baseOuter",
kind: "enyo.canvas.Circle",
bounds: {}
}, {
name: "baseInner",
kind: "enyo.canvas.Circle",
bounds: {}
}, {
name: "stick",
kind: "enyo.canvas.Circle",
bounds: {}
}, {
name: "debug",
kind: "canvas.Text",
bounds: {
l: 0,
t: 15
},
color: "black"
} ],
handlers: {
ontouchstart: "eventTouchStart",
ontouchend: "eventTouchEnd",
ontouchmove: "eventTouchMove",
onmousedown: "eventMouseDown",
onmouseup: "eventMouseUp",
onmousemove: "eventMouseMove"
},
rendered: function() {
this.inherited(arguments), this.padHeightChanged(), this.padWidthChanged(), this.absolutelyPositionedChanged(), this.stickRadiusChanged(), this.baseColorChanged(), this.stickColorChanged(), this.debugChanged();
},
padHeightChanged: function() {
this.setAttribute("height", this.padHeight);
},
padWidthChanged: function() {
this.setAttribute("width", this.padWidth);
},
absolutelyPositionedChanged: function() {
this.height = this.getAttribute("height"), this.width = this.getAttribute("width");
if (this.absolutelyPositioned) {
var e = left = 0, t = this;
do {
var n = t.node || t.hasNode() || 0;
e += n.offsetTop, left += n.offsetLeft;
} while (t = t.parent);
this.top = e, this.left = left;
} else {
var r = this.getBounds();
this.top = r.top, this.left = r.left;
}
},
stickRadiusChanged: function() {
this.$.stick.bounds.h = this.stickRadius, this.$.stick.bounds.w = this.stickRadius, this.$.baseOuter.bounds.h = this.stickRadius * 3 / 2, this.$.baseOuter.bounds.w = this.stickRadius * 3 / 2, this.$.baseInner.bounds.w = this.stickRadius * 3 / 4, this.$.baseInner.bounds.h = this.stickRadius * 3 / 4, this.draw();
},
baseColorChanged: function() {
this.$.baseOuter.setColor(""), this.$.baseOuter.setOutlineColor(this.baseColor), this.$.baseInner.setColor(this.baseColor), this.$.baseInner.setOutlineColor(""), this.draw();
},
stickColorChanged: function() {
this.$.stick.setColor(this.stickColor), this.draw();
},
debugChanged: function() {
this.$.debug.setColor(this.debug), this.draw();
},
touchscreenDevice: function() {
return "createTouch" in document ? !0 : !1;
},
getX: function() {
return this.pressed ? this.stickX - this.baseX : 0;
},
getY: function() {
return this.pressed ? -(this.stickY - this.baseY) : 0;
},
getPosition: function() {
return {
x: this.getX(),
y: this.getY()
};
},
isUp: function() {
if (!this.pressed) return !1;
var e = this.getX(), t = this.getY();
return t >= 0 ? !1 : Math.abs(t) < this.jitter || Math.abs(t) < Math.abs(e) ? !1 : !0;
},
isDown: function() {
if (!this.pressed) return !1;
var e = this.getX(), t = this.getY();
return t <= 0 ? !1 : Math.abs(t) < this.jitter || Math.abs(t) < Math.abs(e) ? !1 : !0;
},
isLeft: function() {
if (!this.pressed) return !1;
var e = this.getX(), t = this.getY();
return e >= 0 ? !1 : Math.abs(e) < this.jitter || Math.abs(e) < Math.abs(t) ? !1 : !0;
},
isRight: function() {
if (!this.pressed) return !1;
var e = this.getX(), t = this.getY();
return e <= 0 ? !1 : Math.abs(e) < this.jitter || Math.abs(e) < Math.abs(t) ? !1 : !0;
},
eventMouseDown: function(e, t) {
var n = 0, r = 0;
if (t.pageX || t.pageY) n = t.pageX, r = t.pageY; else if (t.clientX || t.clientY) posx = t.clientX + document.body.scrollLeft + document.documentElement.scrollLeft, posy = t.clientY + document.body.scrollTop + document.documentElement.scrollTop;
return this.touchDown(n, r), !0;
},
eventTouchStart: function(e, t) {
if (t.changedTouches.length < 1) return;
for (var n = 0; n < t.changedTouches.length; n++) if (this.touchId < 0 && enyo.indexOf(t.changedTouches[n].identifier, GTS_Joystick_Touch_List) < 0) {
this.touchId = t.changedTouches[n].identifier, GTS_Joystick_Touch_List.push(this.touchId), this.touchDown(t.changedTouches[n].pageX, t.changedTouches[n].pageY);
break;
}
return t.preventDefault(), !0;
},
touchDown: function(e, t) {
this.pressed = !0, this.baseX = this.stickX = e, this.baseY = this.stickY = t, this.sendEvents(), this.draw();
},
eventMouseMove: function(e, t) {
var n = 0, r = 0;
if (t.pageX || t.pageY) n = t.pageX, r = t.pageY; else if (t.clientX || t.clientY) posx = t.clientX + document.body.scrollLeft + document.documentElement.scrollLeft, posy = t.clientY + document.body.scrollTop + document.documentElement.scrollTop;
return this.touchMoved(n, r), !0;
},
eventTouchMove: function(e, t) {
if (t.changedTouches.length < 1) return;
for (var n = 0; n < t.changedTouches.length; n++) if (this.touchId === t.changedTouches[n].identifier) {
this.touchMoved(t.changedTouches[n].pageX, t.changedTouches[n].pageY);
break;
}
return t.preventDefault(), !0;
},
touchMoved: function(e, t) {
this.pressed && (this.stickX = e, this.stickY = t, this.sendEvents(), this.draw());
},
eventMouseUp: function(e, t) {
return this.touchUp(), !0;
},
eventTouchEnd: function(e, t) {
if (t.changedTouches.length < 1) return;
for (var n = 0; n < t.changedTouches.length; n++) if (this.touchId === t.changedTouches[n].identifier) {
var r = enyo.indexOf(this.touchId, GTS_Joystick_Touch_List);
r >= 0 && GTS_Joystick_Touch_List.splice(r, 1), this.touchId = -1, this.touchUp();
break;
}
return t.preventDefault(), !0;
},
touchUp: function() {
this.pressed = !1, this.stickX = this.baseX = 0, this.stickY = this.baseY = 0, this.sendEvents(), this.draw();
},
sendEvents: function() {
var e = {
pressed: this.pressed,
x: this.getX(),
y: this.getY(),
up: this.isUp(),
down: this.isDown(),
left: this.isLeft(),
right: this.isRight()
};
this.doStickMove(e), !this.wasUp && e.up ? (this.wasUp = !0, this.doStickUp(e)) : e.up || (this.wasUp = !1), !this.wasDown && e.down ? (this.wasDown = !0, this.doStickDown(e)) : e.down || (this.wasDown = !1), !this.wasLeft && e.left ? (this.wasLeft = !0, this.doStickLeft(e)) : e.left || (this.wasLeft = !1), !this.wasRight && e.right ? (this.wasRight = !0, this.doStickRight(e)) : e.right || (this.wasRight = !1), this.wasPressed && !e.pressed ? (this.wasPressed = !1, this.doStickCentered(e)) : e.pressed && (this.wasPressed = !0);
},
draw: function() {
this.pressed ? (this.$.stick.bounds.l = this.stickX - this.left, this.$.stick.bounds.t = this.stickY - this.top, this.$.baseOuter.bounds.l = this.baseX - this.left, this.$.baseOuter.bounds.t = this.baseY - this.top, this.$.baseInner.bounds.l = this.baseX - this.left, this.$.baseInner.bounds.t = this.baseY - this.top) : (this.$.stick.bounds.l = -this.$.stick.bounds.w, this.$.stick.bounds.t = -this.$.stick.bounds.h, this.$.baseOuter.bounds.l = -this.$.baseOuter.bounds.w, this.$.baseOuter.bounds.t = -this.$.baseOuter.bounds.h, this.$.baseInner.bounds.l = -this.$.baseInner.bounds.w, this.$.baseInner.bounds.t = -this.$.baseInner.bounds.h), this.debug.length > 0 && this.$.debug.setText("X: " + this.getX() + " Y: " + this.getY() + " | " + this.touchId + " | " + this.name), this.update();
}
});

// Keyboard.js

enyo.kind({
name: "GTS.Keyboard",
kind: enyo.Control,
keyboardJSON: [ [ {
type: "symbol",
on: "~",
off: "`"
}, {
type: "symbol",
on: "!",
off: "1"
}, {
type: "symbol",
on: "@",
off: "2"
}, {
type: "symbol",
on: "#",
off: "3"
}, {
type: "symbol",
on: "$",
off: "4"
}, {
type: "symbol",
on: "%",
off: "5"
}, {
type: "symbol",
on: "^",
off: "6"
}, {
type: "symbol",
on: "&amp;",
off: "7"
}, {
type: "symbol",
on: "*",
off: "8"
}, {
type: "symbol",
on: "(",
off: "9"
}, {
type: "symbol",
on: ")",
off: "0"
}, {
type: "symbol",
on: "_",
off: "-"
}, {
type: "symbol",
on: "+",
off: "="
}, {
type: "delete",
value: "del"
} ], [ {
type: "tab",
value: "tab"
}, {
type: "letter",
value: "q"
}, {
type: "letter",
value: "w"
}, {
type: "letter",
value: "e"
}, {
type: "letter",
value: "r"
}, {
type: "letter",
value: "t"
}, {
type: "letter",
value: "y"
}, {
type: "letter",
value: "u"
}, {
type: "letter",
value: "i"
}, {
type: "letter",
value: "o"
}, {
type: "letter",
value: "p"
}, {
type: "symbol",
on: "{",
off: "["
}, {
type: "symbol",
on: "}",
off: "]"
}, {
type: "symbol",
on: "|",
off: "\\"
} ], [ {
type: "capslock",
value: "caps"
}, {
type: "letter",
value: "a"
}, {
type: "letter",
value: "s"
}, {
type: "letter",
value: "d"
}, {
type: "letter",
value: "f"
}, {
type: "letter",
value: "g"
}, {
type: "letter",
value: "h"
}, {
type: "letter",
value: "j"
}, {
type: "letter",
value: "k"
}, {
type: "letter",
value: "l"
}, {
type: "symbol",
on: ":",
off: ";"
}, {
type: "symbol",
on: '"',
off: "'"
}, {
type: "return",
value: "enter"
} ], [ {
type: "left-shift",
value: "shift"
}, {
type: "letter",
value: "z"
}, {
type: "letter",
value: "x"
}, {
type: "letter",
value: "c"
}, {
type: "letter",
value: "v"
}, {
type: "letter",
value: "b"
}, {
type: "letter",
value: "n"
}, {
type: "letter",
value: "m"
}, {
type: "symbol",
on: "&lt;",
off: ","
}, {
type: "symbol",
on: "&gt;",
off: "."
}, {
type: "symbol",
on: "?",
off: "/"
}, {
type: "right-shift",
value: "shift"
} ], [ {
type: "space",
value: "space"
} ] ],
symbolIds: [],
letterIds: [],
shift: !1,
capslock: !1,
published: {
write: ""
},
components: [ {
name: "keyboardWrapper",
classes: "gts-keyboard"
} ],
rendered: function() {
this.inherited(arguments), this.buildKeyBoardUI();
},
buildKeyBoardUI: function() {
this.symbolIds = [], this.letterIds = [], this.shift = !1, this.capslock = !1;
var e = [];
for (var t = 0; t < this.keyboardJSON.length; t++) {
var n = [];
for (var r = 0; r < this.keyboardJSON[t].length; r++) {
var i = "-" + t + "-" + r + "-";
this.keyboardJSON[t][r].type === "symbol" ? (this.symbolIds.push(i), n.push({
name: i,
classes: "key symbol",
allowHtml: !0,
content: this.keyboardJSON[t][r].off,
offKey: this.keyboardJSON[t][r].off,
onKey: this.keyboardJSON[t][r].on,
ontap: "keyTapped"
})) : this.keyboardJSON[t][r].type === "letter" ? (this.letterIds.push(i), n.push({
name: i,
classes: "key letter",
content: this.keyboardJSON[t][r].value,
ontap: "keyTapped"
})) : n.push({
name: i,
classes: "key " + this.keyboardJSON[t][r].type,
content: this.keyboardJSON[t][r].value,
ontap: "keyTapped"
});
}
e.push({
classes: "keyboard-row",
defaultKind: "onyx.Button",
components: n
});
}
this.$.keyboardWrapper.destroyClientControls(), this.$.keyboardWrapper.createComponents(e, {
owner: this
}), this.$.keyboardWrapper.render();
},
keyTapped: function(e, t) {
var n = {};
if (e.hasClass("left-shift") || e.hasClass("right-shift")) this.shift = !this.shift, this.adjustLetters(), this.adjustSymbols(), n.which = 16; else if (e.hasClass("capslock")) this.capslock = !this.capslock, this.adjustLetters(), n.which = 20; else {
var r = e.getContent();
r = e.hasClass("symbol") ? r.replace("&amp;", "&").replace("&lt;", "<").replace("&gt;", ">") : r, r = e.hasClass("space") ? " " : r, r = e.hasClass("tab") ? "	" : r, r = e.hasClass("return") ? "\r" : r, r = e.hasClass("uppercase") ? r.toUpperCase() : r.toLowerCase(), this.shift === !0 && (this.shift = !1, this.adjustSymbols(), this.adjustLetters());
if (typeof this.write != "undefined" && this.write !== "") if (e.hasClass("delete")) {
if (this.write.kind.match(/input/gi)) {
var i = this.write.getValue();
this.write.setValue(i.substr(0, i.length - 1));
} else {
var s = this.write.getContent();
this.write.setContent(s.substr(0, s.length - 1));
}
n.which = 8;
} else this.write.kind.match(/input/gi) ? this.write.setValue(this.write.getValue() + r) : this.write.setContent(this.write.getContent() + r), n.which = r.charCodeAt(0);
}
this.write.bubble("oninput", n), this.write.bubble("onkeyup", n), this.write.bubble("onkeydown", n);
},
adjustSymbols: function() {
for (var e = 0; e < this.symbolIds.length; e++) this.$[this.symbolIds[e]].setContent(this.$[this.symbolIds[e]][this.shift ? "onKey" : "offKey"]);
},
adjustLetters: function() {
for (var e = 0; e < this.letterIds.length; e++) this.$[this.letterIds[e]].addRemoveClass("uppercase", this.shift && !this.capslock || !this.shift && this.capslock);
}
});

// ProgressDialog.js

enyo.kind({
name: "GTS.ProgressDialog",
kind: "onyx.Popup",
classes: "gts-progress-dialog",
published: {
title: "",
message: "",
progress: "",
progressBarClasses: "",
min: 0,
max: 100,
showStripes: !1,
animateStripes: !1,
animateProgress: !1,
cancelText: "",
cancelClass: "onyx-negative",
centered: !0,
floating: !0,
modal: !0,
scrim: !0,
scrimclasses: "onyx-scrim-translucent",
autoDismiss: !1
},
events: {
onCancel: ""
},
components: [ {
name: "title",
classes: "title-wrapper"
}, {
name: "message",
classes: "message-wrapper",
allowHtml: !0
}, {
name: "progressBar",
kind: "onyx.ProgressBar"
}, {
classes: "button-wrapper",
components: [ {
name: "cancelButton",
kind: "onyx.Button",
ontap: "cancel",
showing: !1
} ]
} ],
rendered: function() {
this.inherited(arguments), this.baseButtonClasses = this.$.cancelButton.getClassAttribute(), this.titleChanged(), this.messageChanged(), this.progressChanged(), this.progressBarClassesChanged(), this.minChanged(), this.maxChanged(), this.showStripesChanged(), this.animateStripesChanged(), this.cancelTextChanged(), this.cancelClassChanged();
},
show: function(e) {
this.inherited(arguments);
for (property in e) {
property = property.replace(/\W/g, "");
var t = "set" + property.charAt(0).toUpperCase() + property.slice(1);
enyo.isFunction(this[t]) && this[t](e[property]);
}
},
titleChanged: function() {
this.$.title.setContent(this.title);
},
messageChanged: function() {
this.$.message.setContent(this.message), this.message.length === 0 ? this.$.message.hide() : this.$.message.show();
},
progressChanged: function() {
this.animateProgress ? this.$.progressBar.animateProgressTo(this.progress) : this.$.progressBar.setProgress(this.progress);
},
progressBarClassesChanged: function() {
this.$.progressBar.setBarClasses(this.progressBarClasses);
},
minChanged: function() {
this.$.progressBar.setMin(this.min);
},
maxChanged: function() {
this.$.progressBar.setMax(this.max);
},
showStripesChanged: function() {
this.$.progressBar.setShowStripes(this.showStripes);
},
animateStripesChanged: function() {
this.$.progressBar.setAnimateStripes(this.animateStripes);
},
cancelTextChanged: function() {
this.$.cancelButton.setContent(this.cancelText), this.cancelText.length === 0 ? this.$.cancelButton.hide() : this.$.cancelButton.show();
},
cancelClassChanged: function() {
this.$.cancelButton.setClassAttribute(this.baseButtonClasses + " " + this.cancelClass);
},
cancel: function(e, t) {
this.doCancel(t), this.hide();
}
});

// Array.js

Array.prototype.swap = function(e, t) {
var n = this[e];
return this[e] = this[t], this[t] = n, this;
};

// Date.js

Date.prototype.format = function(e, t) {
var n = "";
return e == "special" ? n = "yyyy-MM-dd HH:mm:ss" : typeof e == "undefined" ? n = dateFormat.masks.mediumDate + " " + dateFormat.masks.shortTime : enyo.isString(e) || (typeof e["date"] == "undefined" ? e.date = "mediumDate" : typeof e["time"] == "undefined" && (e.time = "shortTime"), n = (dateFormat.masks.hasOwnProperty(e.date) ? dateFormat.masks[e.date] : e.date) + " " + (dateFormat.masks.hasOwnProperty(e.time) ? dateFormat.masks[e.time] : e.time)), dateFormat(this, n, t);
}, Date.format = function(e) {
return (new Date).format(e);
}, Date.prototype.setStartOfMonth = function() {
return this.setDate(1), this.setHours(0), this.setMinutes(0), this.setSeconds(0), this.setMilliseconds(0), Date.parse(this);
}, Date.prototype.setEndOfMonth = function() {
return this.setDate(this.daysInMonth()), this.setHours(23), this.setMinutes(59), this.setSeconds(59), this.setMilliseconds(999), Date.parse(this);
}, Date.prototype.daysInMonth = function() {
return 32 - (new Date(this.getFullYear(), this.getMonth(), 32)).getDate();
}, Date.deformat = function(e) {
var t = Date.parse(e);
return isNaN(t) && (t = Date.deformat(e.replace(/A\.M\./i, "am").replace(/P\.M\./i, "pm"))), t;
}, Date.validDate = function(e) {
return Object.isDate(e) && !isNaN(e.getTime());
};

// Math.js

Math.sum = function(e) {
var t = 0;
for (var n = 0; n < e.length; n++) t += e[n];
return t;
}, Math.mean = function(e) {
return e.length > 0 ? this.sum(e) / e.length : !1;
}, Math.median = function(e) {
return e.length <= 0 ? !1 : (e = this.sort(e), e.length.isEven() ? this.mean([ e[e.length / 2 - 1], e[e.length / 2] ]) : e[(e.length / 2).floor()]);
}, Math.variance = function(e) {
if (e.length <= 0) return !1;
var t = this.mean(e), n = [];
for (var r = 0; r < e.length; r++) n.push(this.pow(e[r] - t, 2));
return this.mean(n);
}, Math.stdDev = function(e) {
return this.sqrt(this.variance(e));
}, Math.sinh = function(e) {
return (this.exp(e) - this.exp(-e)) / 2;
}, Math.cosh = function(e) {
return (this.exp(e) + this.exp(-e)) / 2;
}, Math.tanh = function(e) {
return this.sinh(e) / this.cosh(e);
}, Math.coth = function(e) {
return this.cosh(e) / this.sinh(e);
}, Math.sech = function(e) {
return 2 / (this.exp(e) + this.exp(-e));
}, Math.csch = function(e) {
return 2 / (this.exp(e) - this.exp(-e));
}, Math.sort = function(e, t) {
return e.clone().sort(function(e, n) {
return t ? n - e : e - n;
});
};

// Number.js

Number.prototype.isNaN = function() {
return isNaN(this);
}, Number.prototype.isNull = function() {
return this == 0;
}, Number.prototype.isEven = function() {
return this.isInteger() ? this % 2 === 0 ? !1 : !0 : !1;
}, Number.prototype.isOdd = function() {
return this.isInteger() ? this % 2 === 0 ? !0 : !1 : !1;
}, Number.prototype.isInteger = function(e) {
return this.isNaN() ? !1 : e && this.isNull() ? !1 : this - this.floor() === 0 ? !1 : !0;
}, Number.prototype.isNatural = function(e) {
return this.isInteger(e) && this >= 0;
}, Number.prototype.formatCurrency = function(e, t, n, r) {
e = isNaN(e) ? 2 : Math.abs(e), t = t || "$", n = n || ".", r = typeof r == "undefined" ? "," : r;
var i = this < 0 ? "-" : "", s = Math.abs(this).toFixed(e), o = parseInt(s) + "", u = (u = o.length) > 3 ? u % 3 : 0;
return i + t + (u ? o.substr(0, u) + r : "") + o.substr(u).replace(/(\d{3})(?=\d)/g, "$1" + r) + (e ? n + Math.abs(s - o).toFixed(e).slice(2) : "");
};

// Object.js

Object.numericValues = function(e) {
return Object.values(e).select(Object.isNumber);
}, Object.validNumber = function(e) {
return this.isNumber(e) && !isNaN(parseFloat(e)) && isFinite(e);
}, Object.swap = function(e, t, n) {
var r = e[t];
return e[t] = e[n], e[n] = r, e;
}, Object.isFunction = function(e) {
return enyo.isFunction ? enyo.isFunction(e) : Object.prototype.toString.call(e) === "[object Function]";
}, Object.isString = function(e) {
return enyo.isString ? enyo.isString(e) : Object.prototype.toString.call(e) === "[object String]";
}, Object.isNumber = function(e) {
return Object.prototype.toString.call(e) === "[object Number]";
}, Object.isDate = function(e) {
return Object.prototype.toString.call(e) === "[object Date]";
}, Object.isUndefined = function(e) {
return typeof object == "undefined";
};

// String.js

enyo.singleton({
name: "GTS.String",
kind: "enyo.Component",
published: {
dirtyItem: [ "&", "<", ">", '"', "`", "'", "\n" ],
cleanItem: [ "&amp;", "$lt;", "&gt;", "&quot;", "'", "'", " " ]
},
stripHTML: function(e) {
return e.replace(/<\S[^><]*>/g, "");
},
cleanString: function(e) {
for (var t = 0; t < this.dirtyItem.length; t++) e = e.replace(new RegExp(this.dirtyItem[t], "g"), this.cleanItem[t]);
return e;
},
dirtyString: function(e) {
for (var t = 0; t < this.dirtyItem.length; t++) e = e.replace(new RegExp(this.cleanItem[t], "g"), this.dirtyItem[t]);
return e;
},
trim: function(e) {
return e.replace(/^\s\s*/, "").replace(/\s\s*$/, "");
},
ucfirst: function(e) {
var t = e.charAt(0).toUpperCase();
return t + e.substr(1);
},
isBlank: function(e) {
return /^\s*$/.test(e);
},
isJSON: function(e) {
return e.blank() ? !1 : (e = e.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@"), e = e.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]"), e = e.replace(/(?:^|:|,)(?:\s*\[)+/g, ""), /^[\],:{}\s]*$/.test(e));
}
});

// SelectedMenu.js

enyo.kind({
name: "GTS.SelectedMenu",
kind: "onyx.Menu",
classes: "gts-selectedMenu",
published: {
choices: [],
value: ""
},
events: {
onChange: ""
},
components: [],
handlers: {
onSelect: "selectionChanged"
},
choicesChanged: function() {
this.destroyClientControls(), enyo.isArray(this.choices) && this.createComponents(this.choices), this.valueChanged(), this.render(), this.reflow();
},
valueChanged: function() {
var e = this.getClientControls(), t;
for (var n = 0; n < e.length; n++) t = e[n].value === this.value, e[n].addRemoveClass("selected", t), e[n].addRemoveClass("normal", !t);
},
selectionChanged: function(e, t) {
this.setValue(t.selected.value), this.doChange(t.selected);
}
});

// SelectorBar.js

enyo.kind({
name: "GTS.SelectorBar",
kind: "onyx.Item",
classes: "gts-selectorBar",
published: {
label: "Select One",
sublabel: "",
choices: [],
value: "",
disabled: !1,
maxHeight: 200,
labelWidth: null
},
events: {
onChange: ""
},
components: [ {
name: "base",
kind: "enyo.FittableColumns",
components: [ {
name: "valueIcon",
kind: "enyo.Image",
style: "margin-right: 1em;"
}, {
name: "valueDisplay",
fit: !0
}, {
kind: "onyx.MenuDecorator",
components: [ {
name: "labelButton",
kind: "onyx.Button",
classes: "label arrow"
}, {
name: "menu",
kind: "onyx.Picker",
classes: "gts-selectorBar",
onChange: "selectionChanged",
components: []
} ]
} ]
}, {
name: "sublabel",
classes: "sub-label"
} ],
rendered: function() {
this.inherited(arguments), this.labelChanged(), this.sublabelChanged(), this.choicesChanged(), this.valueChanged(), this.disabledChanged(), this.labelWidthChanged(), this.maxHeightChanged(), enyo.asyncMethod(this, this.reflow);
},
reflow: function() {
enyo.asyncMethod(this, this.waterfallDown, "onresize", "onresize", this);
},
labelChanged: function() {
this.$.labelButton.setContent(this.label);
},
sublabelChanged: function() {
this.$.sublabel.setContent(this.sublabel), this.sublabel === "" ? this.$.sublabel.hide() : this.$.sublabel.show();
},
choicesChanged: function() {
this.$.menu.destroyClientControls(), this.$.menu.createComponents(this.choices), this.valueChanged();
},
disabledChanged: function() {
this.$.labelButton.setDisabled(this.disabled);
},
maxHeightChanged: function() {
this.$.menu.setMaxHeight(this.maxHeight);
},
labelWidthChanged: function() {
this.$.labelButton.applyStyle("width", this.labelWidth);
},
setValue: function(e) {
this.value = e, this.valueChanged();
},
valueChanged: function() {
if (this.choices.length === 0) return;
this.value === null && (this.value = this._getValue(this.choices[0]));
for (var e = 0; e < this.choices.length; e++) if (this.value === this._getValue(this.choices[e])) {
this.$.valueDisplay.setContent(this.choices[e].content), this.choices[e].icon ? (this.$.valueIcon.setSrc(this.choices[e].icon), this.$.valueIcon.show()) : this.$.valueIcon.hide();
break;
}
this.reflow();
},
_getValue: function(e) {
return e.hasOwnProperty("value") ? e.value : e.content;
},
selectionChanged: function(e, t) {
return this.value = t.selected.hasOwnProperty("value") ? t.selected.value : t.content, this.valueChanged(), this.doChange(t), this.reflow(), !0;
}
});

// TimePicker.js

enyo.kind({
name: "GTS.TimePicker",
classes: "gts-timepicker",
loaded: !1,
published: {
value: null,
minuteInterval: 5,
is24HrMode: !1,
label: "Time"
},
events: {
onChange: ""
},
components: [ {
name: "label",
classes: "label"
}, {
kind: "onyx.PickerDecorator",
onChange: "pickerChanged",
components: [ {}, {
name: "hourPicker",
kind: "onyx.Picker",
components: [ {
content: "Loading"
} ]
} ]
}, {
kind: "onyx.PickerDecorator",
onChange: "pickerChanged",
components: [ {}, {
name: "minutePicker",
kind: "onyx.Picker",
components: [ {
content: "Loading"
} ]
} ]
}, {
name: "segmentWrapper",
kind: "onyx.PickerDecorator",
onChange: "pickerChanged",
components: [ {}, {
name: "segmentPicker",
kind: "onyx.Picker",
components: [ {
content: "AM",
value: 0
}, {
content: "PM",
value: 12
} ]
} ]
} ],
constructor: function() {
this.inherited(arguments), this.value = this.value || new Date;
},
rendered: function() {
this.inherited(arguments), this.minuteIntervalChanged(), this.is24HrModeChanged(), this.labelChanged(), this.loaded = !0;
},
minuteIntervalChanged: function() {
this.$.minutePicker.destroyClientControls();
var e = [];
for (var t = 0; t < 60; t += this.minuteInterval) e.push({
content: t > 9 ? t : "0" + t,
value: t
});
this.$.minutePicker.createComponents(e);
},
is24HrModeChanged: function() {
this.$.segmentWrapper.setShowing(!this.is24HrMode), this.setupHour(), this.valueChanged();
},
setupHour: function(e, t) {
var n = [];
this.$.hourPicker.destroyClientControls();
for (var r = this.is24HrMode ? 0 : 1; r <= (this.is24HrMode ? 23 : 12); r++) n.push({
content: r > 9 ? r : "0" + r,
value: r
});
this.$.hourPicker.createComponents(n);
},
labelChanged: function() {
this.$.label.setContent(this.label), this.$.label.applyStyle("width", "100%"), enyo.asyncMethod(this.$.label, this.$.label.applyStyle, "width", null);
},
valueChanged: function() {
if (Object.prototype.toString.call(this.value) !== "[object Date]" || isNaN(this.value.getTime())) this.value = new Date;
var e = this.value.getHours(), t = Math.floor(this.value.getMinutes() / this.minuteInterval) * this.minuteInterval, n = (e >= 12) * 12;
this.setItemSelected(this.$.hourPicker, this.is24HrMode ? e : e - n || 12), this.setItemSelected(this.$.minutePicker, t), this.setItemSelected(this.$.segmentPicker, n);
},
setItemSelected: function(e, t) {
var n = e.getClientControls(), r;
for (var i = 0; i < n.length; i++) {
r = typeof n[i].value != "undefined" ? n[i].value : n[i].content;
if (r == t) {
e.setSelected(n[i]);
break;
}
}
},
getItemSelected: function(e) {
var t = e.getSelected();
return typeof t.value != "undefined" ? t.value : t.content;
},
pickerChanged: function() {
if (!this.loaded) return;
var e = parseInt(this.getItemSelected(this.$.hourPicker)), t = parseInt(this.getItemSelected(this.$.minutePicker), 10), n = this.getItemSelected(this.$.segmentPicker);
return e = this.is24HrMode ? e : e + (e == 12 ? -!n * 12 : n), this.setValue(new Date(this.value.getFullYear(), this.value.getMonth(), this.value.getDate(), e, t, this.value.getSeconds(), this.value.getMilliseconds())), this.doChange({
value: this.value
}), !0;
}
});

// ToggleBar.js

enyo.kind({
name: "GTS.ToggleBar",
kind: "onyx.Item",
classes: "gts-ToggleBar",
published: {
label: "Toggle Button",
sublabel: "",
onContent: "On",
offContent: "Off",
value: !1
},
events: {
onChange: ""
},
components: [ {
name: "base",
kind: "enyo.FittableColumns",
components: [ {
fit: !0,
components: [ {
name: "label"
}, {
name: "sublabel",
style: "font-size: 75%;"
} ]
}, {
name: "switch",
kind: "onyx.ToggleButton",
ontap: "switchToggled",
onChange: "switchChanged"
} ]
} ],
handlers: {
ontap: "barTapped"
},
rendered: function() {
this.inherited(arguments), this.labelChanged(), this.sublabelChanged(), this.onContentChanged(), this.offContentChanged(), this.valueChanged();
},
reflow: function() {
this.$.base.reflow();
},
barTapped: function() {
this.$["switch"].setValue(!this.getValue()), this.doChange(this.$["switch"]);
},
switchToggled: function(e, t) {
return this.doChange(t), !0;
},
switchChanged: function(e, t) {
return !0;
},
labelChanged: function() {
this.$.label.setContent(this.label);
},
sublabelChanged: function() {
this.$.sublabel.setContent(this.sublabel);
},
onContentChanged: function() {
this.$["switch"].setOnContent(this.onContent);
},
offContentChanged: function() {
this.$["switch"].setOffContent(this.offContent);
},
valueChanged: function() {
this.$["switch"].setValue(this.value), this.reflow();
},
getValue: function() {
return this.$["switch"].getValue();
}
});

// tweet.js

enyo.kind({
name: "Sam.Tweet",
kind: "onyx.Item",
components: [ {
tag: "img",
name: "Picture",
classes: "Tweet-Image"
}, {
tag: "b",
name: "UserName"
}, {
name: "Handle",
classes: "Tweet-Handle",
tag: "div"
}, {
name: "Message",
classes: "Tweet-Message"
} ],
Handlers: {
ontap: "OnTap"
},
published: {
Picture: "",
Handle: "",
UserName: "",
Message: ""
},
create: function() {
this.inherited(arguments), this.PictureChanged(), this.HandleChanged(), this.UserNameChanged(), this.MessageChanged();
},
PictureChanged: function() {
this.$.Picture.setAttribute("src", this.Picture);
},
HandleChanged: function() {
this.Handle !== this.UserName && this.Handle !== "" ? this.$.Handle.setContent(" @" + this.Handle + "\n") : this.Handle === this.UserName && this.$.Handle.setContent(" ");
},
MessageChanged: function() {
this.$.Message.setContent(this.Message);
},
UserNameChanged: function() {
this.UserName !== this.Handle ? this.$.UserName.setContent(this.UserName + ":") : this.UserName === this.Handle && this.$.UserName.setContent("@" + this.UserName + ":");
},
OnTap: function(e, t) {
console.log(e), console.log(t);
}
});

// BigTweet.js

enyo.kind({
kind: "enyo.Control",
name: "Sam.BigTweet",
components: [ {
kind: "Sam.Tweet",
picture: "icon.png",
Message: "Hello"
}, {
kind: "GTS.DividerDrawer",
caption: "Images"
} ]
});

// SearchPanel.js

enyo.kind({
name: "Sam.SearchPanel",
kind: "enyo.Control",
data: [],
layoutKind: "FittableRowsLayout",
classes: "onyx",
events: {
onTweetTap: ""
},
components: [ {
kind: "enyo.WebService",
jsonp: !0,
onResponse: "ShowSearchResults",
url: "https://search.twitter.com/search.json",
name: "SearchWebService"
}, {
kind: "onyx.InputDecorator",
classes: "SearchTerm",
components: [ {
kind: "onyx.Input",
name: "SearchTerm",
placeholder: "Search",
onkeydown: "searchOnEnter"
}, {
tag: "Image",
src: "assets/search-input-search.png",
ontap: "Search"
} ]
}, {
kind: "enyo.List",
count: 0,
onSetupItem: "TweetSetup",
name: "SearchPanelTweetList",
fit: !0,
touchOverscroll: !1,
components: [ {
kind: "Sam.Tweet",
name: "Tweet2",
ontap: "SendTweetTap"
} ]
} ],
TweetSetup: function(e, t) {
var n = this.Data[t.index], r = this.$.Tweet2;
r.setPicture(n.profile_image_url_https), r.setUserName(n.from_user_name), r.setHandle(n.from_user), r.setMessage(n.text);
},
searchOnEnter: function(e, t) {
if (t.keyCode === 13) return this.Search(), !0;
},
Search: function(e, t) {
this.$.SearchWebService.send({
q: this.$.SearchTerm.hasNode().value
});
},
ShowSearchResults: function(e, t) {
console.log(t);
if (!t.data) return;
this.Data = t.data.results, this.$.SearchPanelTweetList.setCount(this.Data.length), this.$.SearchPanelTweetList.reset();
},
SendTweetTap: function(e, t) {
var n = t.index;
t.Data = this.Data[n], this.doTweetTap(t);
}
});

// App.js

enyo.kind({
name: "App",
fit: !0,
kind: "Panels",
classes: "app-panels onyx",
arrangerKind: "CollapsingArranger",
components: [ {
name: "Panel1",
layoutKind: "FittableRowsLayout",
classes: "Panel1 onyx",
components: [ {
kind: "onyx.MoreToolbar",
components: [ {
kind: "onyx.Menu",
content: "Hello"
} ]
}, {
kind: "Sam.SearchPanel",
fit: !0,
onTweetTap: "TweetTaped"
} ]
}, {
name: "Tweet",
classes: "onyx",
components: [ {
kind: "onyx.MoreToolbar",
components: [ {
kind: "onyx.Grabber",
ontap: "SwitchPanel"
}, {
content: "Tweet"
} ]
}, {
kind: "Sam.BigTweet"
} ]
} ],
SwitchPanel: function() {
this.setIndex(this.getIndex() === 0 ? 0 : this.getIndex() - 1);
},
TweetTaped: function(e, t) {
console.log("inEvent:"), console.log(t), console.log("inSender:"), console.log(e);
}
});
