// ==UserScript==
// @include			about:addons
// ==/UserScript==

(function () {

    if (!embedderElement) {
        var style = document.createElement('style');
    style.innerHTML = `
    :root {
        --in-content-sidebar-width: 210px !important;
        --sidebar-width: 210px !important;
        --section-width: unset !important;
      }
      /* Reset styles */
      *:not(body, .toggle-button) {
        padding: 0 !important;
        margin: 0 !important;
        box-shadow: none !important;
        font-size: 9pt !important;
        font-weight: normal !important;
        transition: none !important;
        border-radius: 0 !important;
      }
      sidebar-footer,
      recommended-extensions-section,
      recommended-themes-section,
      .main-search,
      .list-section-heading,
      .header-name,
      .addon-badge,
      .addon-description {
        display: none !important;
      }
      html {
        overflow: hidden !important;
      }
      body {
        margin-top: 66px !important;
        border-top: 1px solid rgb(180, 180, 180) !important;
      }
      body::before {
        content: "View and manager your Internet Explorer add-ons";
        position: absolute;
        top: 18px;
        left: 11px;
        color: rgb(0, 102, 213);
        font-size: 11pt;
      }
      #full {
        background-color: rgb(240, 240, 240) !important;
        padding-bottom: 40px !important;
      }
      #sidebar, #content {
        background-color: white !important;
        border-bottom: 1px solid rgb(180, 180, 180) !important;
      }
      #sidebar {
        position: static !important;
        padding: 5px !important;
        border-right: 1px solid rgb(180, 180, 180) !important;
        height: calc(100vh - 118px) !important;
      }
      #sidebar > .spacer {
        display: none;
      }
      #categories {
        width: auto !important;
      }
      .category {
        min-height: 0 !important;
        height: 24px !important;
        background-size: 16px !important;
        background-position: left 2px center !important;
        padding-left: 20px !important;
        color: rgb(0, 102, 213) !important;
      }
      .category-name {
        display: block !important;
      }
      #content {
        padding: 4px !important;
      }
      .page-options-menu {
        position: fixed !important;
        left: 9px !important;
        bottom: 21px !important;
      }
      .page-options-menu > .more-options-button {
        background-color: transparent !important;
        background-image: none !important;
        min-width: 0 !important;
        min-height: 0 !important;
        width: auto !important;
        color: rgb(0, 102, 213) !important;
      }
      .page-options-menu > .more-options-button::before {
        content: "Add-on settings...";
      }
      addon-card {
        pointer-events: none !important;
      }
      addon-card moz-toggle,
      addon-card button,
      addon-card addon-options {
        pointer-events: auto !important;
      }
      .addon-card-collapsed {
        align-items: center !important;
      }
      .addon-icon,
      .more-options-button {
        height: 16px !important;
        width: 16px !important;
      }
      .addon-name {
        margin-left: 2px !important;
      }
    `
    
    document.body.appendChild(style);
    }

    

})();

