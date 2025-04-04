(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['singlePost'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <div class=\"blog-pic\">\r\n        <img src=\"/images/"
    + alias4(((helper = (helper = lookupProperty(helpers,"photoURL") || (depth0 != null ? lookupProperty(depth0,"photoURL") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"photoURL","hash":{},"data":data,"loc":{"start":{"line":4,"column":26},"end":{"line":4,"column":38}}}) : helper)))
    + "\" alt=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"photoAlt") || (depth0 != null ? lookupProperty(depth0,"photoAlt") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"photoAlt","hash":{},"data":data,"loc":{"start":{"line":4,"column":45},"end":{"line":4,"column":57}}}) : helper)))
    + "\">\r\n    </div>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "no-image";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<article class=\"blog-post\">\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"photoURL") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":2,"column":4},"end":{"line":6,"column":11}}})) != null ? stack1 : "")
    + "    \r\n    <div class=\"blog-content "
    + ((stack1 = lookupProperty(helpers,"unless").call(alias1,(depth0 != null ? lookupProperty(depth0,"photoURL") : depth0),{"name":"unless","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":8,"column":29},"end":{"line":8,"column":68}}})) != null ? stack1 : "")
    + "\">\r\n        <h3>"
    + alias4(((helper = (helper = lookupProperty(helpers,"title") || (depth0 != null ? lookupProperty(depth0,"title") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data,"loc":{"start":{"line":9,"column":12},"end":{"line":9,"column":21}}}) : helper)))
    + "</h3>\r\n        <div class=\"blog-date\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"date") || (depth0 != null ? lookupProperty(depth0,"date") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"date","hash":{},"data":data,"loc":{"start":{"line":10,"column":31},"end":{"line":10,"column":39}}}) : helper)))
    + "</div>\r\n        <p class=\"blog-desc\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"description") || (depth0 != null ? lookupProperty(depth0,"description") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data,"loc":{"start":{"line":11,"column":29},"end":{"line":11,"column":44}}}) : helper)))
    + "</p>\r\n        <button type=\"button\" class=\"readMore\" data-title=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"title") || (depth0 != null ? lookupProperty(depth0,"title") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data,"loc":{"start":{"line":12,"column":59},"end":{"line":12,"column":68}}}) : helper)))
    + "\" data-description=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"description") || (depth0 != null ? lookupProperty(depth0,"description") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data,"loc":{"start":{"line":12,"column":88},"end":{"line":12,"column":103}}}) : helper)))
    + "\" data-photo=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"photoURL") || (depth0 != null ? lookupProperty(depth0,"photoURL") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"photoURL","hash":{},"data":data,"loc":{"start":{"line":12,"column":117},"end":{"line":12,"column":129}}}) : helper)))
    + "\" data-alt=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"photoAlt") || (depth0 != null ? lookupProperty(depth0,"photoAlt") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"photoAlt","hash":{},"data":data,"loc":{"start":{"line":12,"column":141},"end":{"line":12,"column":153}}}) : helper)))
    + "\">\r\n            Read More\r\n        </button>\r\n    </div>\r\n</article>";
},"useData":true});
})();