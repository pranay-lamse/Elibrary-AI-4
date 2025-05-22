import React from 'react';
import {Permissions} from '../constants';
import {getFormattedMessage} from "../../shared/sharedMethod";
import '@coreui/icons/css/all.css';
import {CNavGroup, CNavItem} from '@coreui/react'

const _nav = [
    {
        component: CNavItem,
        name: getFormattedMessage('dashboard.title'),
        to: '/app/admin/dashboard',
        icon: <i className="icon-speedometer nav-icons"/>,
       
    },
    {
        component: CNavItem,
        name: getFormattedMessage('books.title'),
        to: '/app/admin/books',
        icon: <i className="fa fa-book nav-icons"/>,
        permission: Permissions.MANAGE_BOOKS,
    },
    {
        component: CNavItem,
        name: getFormattedMessage('books-circulation.title'),
        to: '/app/admin/books-circulation',
        icon: <i className="fas fa-book-reader nav-icons"/>,
        permission: Permissions.MANAGE_BOOKS
    },
    {
        component: CNavItem,
        name: getFormattedMessage('members.title'),
        to: '/app/admin/members',
        icon: <i className="fas fa-users nav-icons"/>,
        permission: Permissions.MANAGE_MEMBERS,
    },
    {
        component: CNavItem,
        name: getFormattedMessage('genres.title'),
        to: '/app/admin/genres',
        icon: <i className="fas fa-layer-group nav-icons"/>,
        permission: Permissions.MANAGE_GENRES,
    },
    {
        component: CNavItem,
        name: getFormattedMessage('authors.title'),
        to: '/app/admin/authors',
        icon: <i className="fas fa-user-friends nav-icons"/>,
        permission: Permissions.MANAGE_AUTHORS,
    },
    {
        component: CNavItem,
        name: getFormattedMessage('publishers.title'),
        to: '/app/admin/publishers',
        icon: <i className="fas fa-atlas nav-icons"/>,
        permission: Permissions.MANAGE_PUBLISHERS,
    },
    {
        component: CNavItem,
        name: getFormattedMessage('book-languages.title'),
        to: '/app/admin/book-languages',
        icon: <i className="fa fa-globe nav-icons"/>,
        permission: Permissions.MANAGE_BOOK_LANGUAGES,
    },
    {
        component: CNavItem,
        name: getFormattedMessage('tags.title'),
        to: '/app/admin/tags',
        icon: <i className="fas fa-tags nav-icons"/>,
        permission: Permissions.MANAGE_TAGS,
    },
    {
        component: CNavItem,
        name: getFormattedMessage('users.title'),
        to: '/app/admin/users',
        icon: <i className="fa fa-user nav-icons"/>,
        permission: Permissions.MANAGE_USERS,
    },
    {
        component: CNavItem,
        name: getFormattedMessage('roles.title'),
        to: '/app/admin/roles',
        icon: <i className="fas fa-user-shield nav-icons"/>,
        permission: Permissions.MANAGE_ROLES,
    },
    {
        component: CNavItem,
        name: getFormattedMessage('membership-plans.title'),
        to: '/app/admin/membership-plans',
        icon: <i className="icon-docs nav-icons"/>,
        permission: Permissions.MANAGE_PLANS,
    },
    {
        component: CNavItem,
        name: getFormattedMessage("subscription.title"),
        to: '/app/admin/subscriptions',
        icon: <i className="icon-docs nav-icons"/>,
        permission: Permissions.MANAGE_PLANS,
    },
    {
        component: CNavItem,
        name: getFormattedMessage('books-series.title'),
        to: '/app/admin/books-series',
        icon: <i className="fas fa-swatchbook nav-icons"/>,
        permission: Permissions.MANAGE_BOOK_SERIES,
    },
    {
        component: CNavItem,
        name: getFormattedMessage("book-request.title"),
        to: '/app/admin/book-requests',
        icon: <i className="fas fa-book nav-icons"/>,
        permission: Permissions.MANANGE_BOOK_REQUEST,
    },
    {
        component: CNavItem,
        name: getFormattedMessage("penalties.title"),
        to: '/app/admin/penalties',
        icon: <i className="fas fa-rupee nav-icons"/>,
        permission: Permissions.MANAGE_PENALTIES,
    },
    {
        component: CNavGroup,
        name: getFormattedMessage("cms.title"),
        route: '/buttons',
        icon: <i className="icon-layers nav-icons"/>,
        permission: Permissions.MANAGE_SETTINGS,
        items: [
            {
                component: CNavItem,
                name: getFormattedMessage('settings.title'),
                to: '/app/admin/settings',
                icon: <i className="fa fa-cog nav-icons"/>,
            },
            {
                component: CNavItem,
                name: getFormattedMessage('home-settings.title'),
                to: '/app/admin/home-settings',
                icon: <i className="fa fa-cogs nav-icons"/>,
            },
            {
                component: CNavItem,
                name: getFormattedMessage('testimonials.title'),
                to: '/app/admin/testimonials',
                icon: <i className="fa fa-quote-left nav-icons"/>,
            },
        ],
    },
]
export default _nav;
