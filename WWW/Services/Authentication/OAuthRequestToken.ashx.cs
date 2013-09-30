using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MVC3Sample;
using OAuth2Provider;
using OAuth2Provider.Request;
using OAuth2Provider.Response;

namespace WWW.Services.Authentication
{
    /// <summary>
    /// Summary description for OAuthRequestToken
    /// </summary>
    public class OAuthRequestToken : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            try
            {


                context.Response.ContentType = "text/plain";

                //var properties = new Dictionary<string, IList<string>>
                //                     {
                //                         {OAuthTokens.ClientId, new[]{"clientid"}},
                //                         {OAuthTokens.ClientSecret, new[]{"clientsecret"}},
                //                         {OAuthTokens.Username, new[]{"username"}},
                //                         {OAuthTokens.Password, new[]{"password"}},
                //                         {OAuthTokens.GrantType, new[]{GrantType.Password}},
                //                     };

                var oauthRequest = new TokenRequest(new OAuth2Provider.Request.HttpRequest(new HttpRequestWrapper(context.Request)), new OAuthServiceLocator());

                var token = oauthRequest.Authorize();

                if (token.RedirectsUri.HasValue())
                {

                    var redirectUri = OAuthResponse
                        .TokenResponse(token.AccessToken, token.ExpiresIn, token.RefreshToken)
                        .SetLocation(token.RedirectsUri)
                        .BuildQueryMessage().LocationUri;

                    context.Response.Redirect(redirectUri);
                }

                var response = OAuthResponse
                            .TokenResponse(token.AccessToken, token.ExpiresIn, token.RefreshToken)
                            .BuildJsonMessage();

                context.Response.Write(response);
            }
            catch (OAuthException ex)
            {

                context.Response.Write(new ErrorResponseBuilder(ex).BuildJsonMessage());
            }

        }

        public bool IsReusable
        {
            get
            {
                return true;
            }
        }
    }
}