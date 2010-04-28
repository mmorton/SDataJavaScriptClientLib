﻿/// <reference path="../../../../ext/ext-core-debug.js"/>
/// <reference path="../../../../Simplate.js"/>
/// <reference path="../../../../sdata/SDataSingleResourceRequest.js"/>
/// <reference path="../../../../sdata/SDataService.js"/>
/// <reference path="../../../../platform/View.js"/>
/// <reference path="../../../../platform/Detail.js"/>
/// <reference path="../../Format.js"/>
/// <reference path="../../Template.js"/>

Ext.namespace("Mobile.SalesLogix.Contact");

Mobile.SalesLogix.Contact.Detail = Ext.extend(Sage.Platform.Mobile.Detail, {       
    constructor: function(o) {
        Mobile.SalesLogix.Contact.Detail.superclass.constructor.call(this);        
        
        Ext.apply(this, o, {
            id: 'contact_detail',
            title: 'Contact',
            expose: false
        });

        this.layout = [
            {label: 'name', tpl: Mobile.SalesLogix.Template.nameLF},
            {name: 'AccountName', label: 'account'},
            {name: 'WorkPhone', label: 'work', renderer: Mobile.SalesLogix.Format.phone},
            {name: 'Mobile', label: 'mobile', renderer: Mobile.SalesLogix.Format.phone},
            {name: 'Email', label: 'email', renderer: Mobile.SalesLogix.Format.mail},
            {name: 'Address', label: 'address', renderer: Mobile.SalesLogix.Format.address},
            {name: 'WebAddress', label: 'web', renderer: Mobile.SalesLogix.Format.link},
            {name: 'AccountManager.UserInfo', label: 'acct mgr', tpl: Mobile.SalesLogix.Template.nameLF},
            {name: 'Owner.OwnerDescription', label: 'owner'},
            {name: 'CreateDate', label: 'create date'},
            {name: 'CreateUser', label: 'create user'},
            {options: {title: 'Related Items', list: true}, as: [                
                {
                    view: 'opportunity_related', 
                    where: this.formatAccountRelatedQuery.createDelegate(this, ['Account.id eq "{0}"'], true),
                    label: 'Opportunities',
                    icon: 'content/images/app/slx/Opportunity_List_24x24.gif'
                }
            ]}           
        ];
    },        
    formatAccountRelatedQuery: function(entry, fmt) {
        return String.format(fmt, entry['Account']['$key']);
    },
    init: function() {     
        Mobile.SalesLogix.Contact.Detail.superclass.init.call(this);   
    },
    createRequest: function() {
        return new Sage.SData.Client.SDataSingleResourceRequest(this.getService())            
            .setResourceKind('contacts')
            .setQueryArgs({
                'include': 'Account,Address,AccountManager,AccountManager/UserInfo',                
                'select': [
                    'Account/AccountName',
                    'FirstName',
                    'LastName',
                    'AccountName',
                    'WorkPhone',
                    'Mobile',
                    'Email',
                    'Address/*',
                    'WebAddress',
                    'AccountManager/UserInfo/FirstName',
                    'AccountManager/UserInfo/LastName',
                    'Owner/OwnerDescription',
                    'CreateDate',
                    'CreateUser'
                ].join(',')             
            })
            .setResourceSelector("'" + this.context.key + "'");
    } 
});