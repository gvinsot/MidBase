﻿<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="index.aspx.cs" Inherits="Business.WWW.index" %>

<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" style="height: 100%">
<head>
    <meta charset="utf-8" />
    <title>SilverScript HTML App</title>
    <link rel="stylesheet" href="styles/bootstrap.css" type="text/css" />
    <link rel="stylesheet" href="styles/app.css" type="text/css" />
    <%--<script type="text/javascript" src="http://code.jquery.com/jquery-1.8.0.js"></script>
        <script type="text/javascript" src="http://code.jquery.com/ui/1.8.23/jquery-ui.js"></script>--%>
    <script type="text/javascript" src="/scripts/libs/jquery.js"></script>
    <%=Scripts%>
</head>

<body data-context="/viewmodels/Test.ashx" style="height: 100%">

    <div style="position: relative; padding-left: 17px; padding-top: 6px; font-size: large; width: 100%; background: #000000; height: 40px; color: white">
        Business Builder
    </div>
    <div style="height: calc(100% - 40px); width: 100%; display: flex">
        <div style="position: relative; background: #0094ff; height: 100%; width: 200px">
            <button onclick="TypeScriptTools.BindingTools.SetContent('MainPage','/views/home.html');" style="width: 100%; height: 40px; display:block">+</button>
            <button onclick="TypeScriptTools.BindingTools.SetContent('MainPage','/views/page1.html');" style="width: 100%;height: 40px; display:block">+</button>
            <button onclick="TypeScriptTools.BindingTools.SetContent('MainPage','/views/page2.html');" style="width: 100%; height: 40px; display:block">+</button>

        </div>
        <div id="MainPage" data-template="/views/home.html" style="height: 100%; width: calc(100% - 200px); display: flex">

        </div>
    </div>
</body>

</html>
