﻿/// <reference path="../../../ext/ext-core-debug.js"/>
/// <reference path="../../../iui/iui.js"/>
/// <reference path="../../../platform/View.js"/>
/// <reference path="Application.js"/>

Ext.namespace("Mobile.SalesLogix");

/// this is a very simple home view.
Mobile.SalesLogix.Home = Ext.extend(Sage.Platform.Mobile.View, {      
    itemTemplate: new Simplate([
        '<li>',
        '<a href="#{%= id %}">',
        '{% if (values["icon"]) { %}',
        '<img src="{%= values["icon"] %}" alt="icon" class="icon" />',
        '{% } %}',
        '{%= title %}',
        '</a>',
        '</li>'
    ]),    
    constructor: function(o) {
        Mobile.SalesLogix.Home.superclass.constructor.call(this);        
        
        Ext.apply(this, o, {
            id: 'home',
            title: 'Home',
            selected: true
        });        
    },
    render: function() {
        Mobile.SalesLogix.Home.superclass.render.call(this);

        var v = App.getViews();
        var o = [];        
        for (var i = 0; i < v.length; i++)
            if (v[i] != this && v[i].expose != false)
                o.push(this.itemTemplate.apply(v[i]));

        Ext.DomHelper.append(this.el, o.join(''));
    },
    init: function() {                                            
        Mobile.SalesLogix.Home.superclass.init.call(this);                  

        App.on('registered', this.viewRegistered, this);
    },    
    viewRegistered: function(view) {
        Ext.DomHelper.append(this.el, this.itemTemplate.apply(view));
    },
    load: function() {
        Mobile.SalesLogix.Home.superclass.load.call(this);

        var user = App.getService().getUserName();
        if (!user || !user.length)
            iui.showPageById("login_dialog");
    }   
});