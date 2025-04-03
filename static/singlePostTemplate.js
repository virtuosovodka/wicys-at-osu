(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['singlePost'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"blog-post\">\r\n    <div class=\"blog-content\">\r\n        <div class=\"blog-text-col\">\r\n            <div class=\"blog-text\">\r\n                <h2>"
    + alias4(((helper = (helper = lookupProperty(helpers,"title") || (depth0 != null ? lookupProperty(depth0,"title") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data,"loc":{"start":{"line":7,"column":20},"end":{"line":7,"column":29}}}) : helper)))
    + "</h2>\r\n                <p class=\"blog-desc\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"desc") || (depth0 != null ? lookupProperty(depth0,"desc") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"desc","hash":{},"data":data,"loc":{"start":{"line":8,"column":37},"end":{"line":8,"column":45}}}) : helper)))
    + "</p>\r\n            </div>\r\n            <button type=\"button\" class=\"readMore buttons\" data-date=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"date") || (depth0 != null ? lookupProperty(depth0,"date") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"date","hash":{},"data":data,"loc":{"start":{"line":10,"column":70},"end":{"line":10,"column":78}}}) : helper)))
    + "\" >Read More</button>\r\n        </div>\r\n        <div class=\"blog-pic\">\r\n            <img src=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"url") || (depth0 != null ? lookupProperty(depth0,"url") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"url","hash":{},"data":data,"loc":{"start":{"line":13,"column":22},"end":{"line":13,"column":29}}}) : helper)))
    + "\" alt=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"alt") || (depth0 != null ? lookupProperty(depth0,"alt") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"alt","hash":{},"data":data,"loc":{"start":{"line":13,"column":36},"end":{"line":13,"column":43}}}) : helper)))
    + "\">\r\n        </div>\r\n    </div>\r\n</div>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"blog-post\">\r\n    <div class=\"blog-content column\">\r\n        <div class=\"testimony-text\">\r\n            <h2>"
    + alias4(((helper = (helper = lookupProperty(helpers,"title") || (depth0 != null ? lookupProperty(depth0,"title") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data,"loc":{"start":{"line":21,"column":16},"end":{"line":21,"column":25}}}) : helper)))
    + "</h2>\r\n            <p class=\"blog-desc\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"desc") || (depth0 != null ? lookupProperty(depth0,"desc") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"desc","hash":{},"data":data,"loc":{"start":{"line":22,"column":33},"end":{"line":22,"column":41}}}) : helper)))
    + "</p>\r\n        </div>\r\n        <button type=\"button\" class=\"readMore buttons\" data-date=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"date") || (depth0 != null ? lookupProperty(depth0,"date") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"date","hash":{},"data":data,"loc":{"start":{"line":24,"column":66},"end":{"line":24,"column":74}}}) : helper)))
    + "\">Read More</button>\r\n    </div>\r\n</div>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"url") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data,"loc":{"start":{"line":2,"column":0},"end":{"line":27,"column":7}}})) != null ? stack1 : "")
    + "\r\n\r\n\r\n\r\n";
},"useData":true});
})();