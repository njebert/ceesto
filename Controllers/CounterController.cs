using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ceesto.Controllers
{
    public class SignalRCounter : Hub
    {
        public Task IncrementCounter()
        {

            List<String> ConnectionIDToIgnore = new List<String>();
            ConnectionIDToIgnore.Add(Context.ConnectionId);
            return Clients.AllExcept(ConnectionIDToIgnore).InvokeAsync("IncrementCounter");
        }

        public Task DecrementCounter()
        {
            List<String> ConnectionIDToIgnore = new List<String>();
            ConnectionIDToIgnore.Add(Context.ConnectionId);
            return Clients.AllExcept(ConnectionIDToIgnore).InvokeAsync("DecrementCounter");
        }
    }
}