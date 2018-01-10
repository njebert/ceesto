using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace ceesto.Controllers
{
    [Route("api/[controller]")]
    public class SampleDataController : Controller
    {
        private static string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        [HttpGet("[action]")]
        public IEnumerable<WeatherForecast> WeatherForecasts(int startDateIndex)
        {
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                DateFormatted = DateTime.Now.AddDays(index + startDateIndex).ToString("d"),
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)]
            });
        }

        [HttpGet("[action]")]
        public IEnumerable<Movie> Movies(int movieID)
        {
            List<Movie> movies = new List<Movie>(){
                new Movie(){
                    MovieID = 1,
                    Title = "Star Wars: The Last Jedi",
                    Director = "Rian Johnson",
                    ReleaseDate = "December 16th, 2017",
                    BoxOfficeGross = "$1,215,000,000"
                },
                new Movie(){
                    MovieID = 2,
                    Title = "Wedding Crashers",
                    Director = "David Dobkin",
                    ReleaseDate = "July 15th, 2005",
                    BoxOfficeGross = "$285,200,000"
                }
            };

            if(movieID > 0){
                movies = movies.Where(m => m.MovieID == movieID).ToList();
            }


            return movies;
        }

        public class WeatherForecast
        {
            public string DateFormatted { get; set; }
            public int TemperatureC { get; set; }
            public string Summary { get; set; }

            public int TemperatureF
            {
                get
                {
                    return 32 + (int)(TemperatureC / 0.5556);
                }
            }
        }

        public class Movie
        {
            public int MovieID { get; set; }
            public string Title { get; set; }
            public string Director { get; set; }
            public string ReleaseDate { get; set; }
            public string BoxOfficeGross { get; set; }
        }
    }
}
