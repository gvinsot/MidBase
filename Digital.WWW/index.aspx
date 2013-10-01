<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="index.aspx.cs" Inherits="WWW.index" %>
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta charset="utf-8" />
        <title>SilverScript HTML App</title>
        <link rel="stylesheet" href="styles/app.css" type="text/css" />
        <script type="text/javascript" src="http://code.jquery.com/jquery-1.8.0.js"></script>
        <script type="text/javascript" src="http://code.jquery.com/ui/1.8.23/jquery-ui.js"></script>
        <%=Scripts%>
    </head>

    <body data-context="/viewmodels/Test.ashx">
        <h1>TEST</h1>
        <h2 data-binding="{Binding url}"></h2>
    
        <div data-context="{Binding sub}">

            <a data-binding="{Binding test}"></a>

            <div data-source="/viewmodels/GetItems.ashx?param1={Binding foo}" data-template="/views/myTemplate.html">

            </div>
        </div>


    </body>

</html>
