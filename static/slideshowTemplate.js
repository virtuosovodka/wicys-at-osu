(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['slideshow'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "active";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"slide "
    + ((stack1 = (lookupProperty(helpers,"addClassToFirst")||(depth0 && lookupProperty(depth0,"addClassToFirst"))||alias2).call(alias1,(data && lookupProperty(data,"index")),{"name":"addClassToFirst","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":18},"end":{"line":1,"column":71}}})) != null ? stack1 : "")
    + "\">\r\n    <div class=\"slide-content\">\r\n        <div>\r\n            <h3>"
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":4,"column":16},"end":{"line":4,"column":24}}}) : helper)))
    + "</h3>\r\n            <p>"
    + alias4(((helper = (helper = lookupProperty(helpers,"desc") || (depth0 != null ? lookupProperty(depth0,"desc") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"desc","hash":{},"data":data,"loc":{"start":{"line":5,"column":15},"end":{"line":5,"column":23}}}) : helper)))
    + "</p>\r\n        </div>\r\n        <img src=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"url") || (depth0 != null ? lookupProperty(depth0,"url") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"url","hash":{},"data":data,"loc":{"start":{"line":7,"column":18},"end":{"line":7,"column":25}}}) : helper)))
    + "\" alt=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"alt") || (depth0 != null ? lookupProperty(depth0,"alt") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"alt","hash":{},"data":data,"loc":{"start":{"line":7,"column":32},"end":{"line":7,"column":39}}}) : helper)))
    + "\">\r\n    </div>\r\n</div>\r\n";
},"useData":true});
})();