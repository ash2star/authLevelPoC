# Native HANA PoC for public and private XSODATA Service

This sample project should show how the same HANA database table can be exposed in a public and private XSODATA Service. The public service is read only. The private service allows full CRUD operations.

## Setup Guide

You must have developer authorization in your HANA System. To try this project just spin up your own HANA Multitennant Database Container (MDC) on the HANA Cloud Platform Trial (HCP). Open the SAP HANA Web-based Development Workbench and create the package:

    de/linuxdozent/gittest

After you've created the package right click on the gittest package and choose **Syncronize with GitHub**. Provide your GitHub credentials to allow the HANA system to read your GitHub repositories. As you can't specify a GitHub repository URL you have to clone the project so you have it in your repository list. Then coose the cloned repository and GitHub branch **master**. Click **Fetch** to retreive the content. After that step you have to activate the artifacts. Try a right click **activate all**. If that fails start with the BOOK.hdbdd file in the data package and work your way through. 

Now add the de.linuxdozent.gittest.roles::admin role to your development user and the de.linuxdozent.gittest.roles::public role to a new user. Don't use your S- or P-User as username if you want to use Application-to-Application Single Sign On (App2AppSSO) with automatic user generation. It will cause an user already exists error. Try what you can do with the /de/linuxdozent/gittest/odata/service.xsodata service using a tool like Postman. Then give /de/linuxdozent/gittest/odatapublic/service.xsodata a try.

## Application-to-Application Single Sign On (App2AppSSO)

If you want to use the HANA MDC XSODATA Service in a HCP HTML5 app and with App2AppSSO then follow the great Blog by Martin Raepple: [Principal Propagation between HTML5- or Java-based applications and SAP HANA XS on SAP HANA Cloud Platform](http://scn.sap.com/community/developer-center/cloud-platform/blog/2016/03/21/principal-propagation-between-html5-and-sap-hana-xs-on-sap-hana-cloud-platform).
