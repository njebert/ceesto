import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import * as MoviesState from '../store/Movies';

// At runtime, Redux will merge together...
type MoviesProps =
    MoviesState.MoviesState        // ... state we've requested from the Redux store
    & typeof MoviesState.actionCreators      // ... plus action creators we've requested
    & RouteComponentProps<{ movieID: number }>; // ... plus incoming routing parameters

class MovieData extends React.Component<MoviesProps, {}> {
    componentWillMount() {
        // This method runs when the component is first added to the page
        let movieID = this.props.match.params.movieID || 0;
        this.props.requestMovies(movieID);
    }

    componentWillReceiveProps(nextProps: MoviesProps) {
        // This method runs when incoming props (e.g., route params) change
        let movieID = nextProps.match.params.movieID || 0;
        this.props.requestMovies(movieID);
    }

    public render() {
        return <div>
            <h1>Movies</h1>
            <p>This component demonstrates fetching data from the server <i>that is (maybe) stored in a local database</i> and working with URL parameters.</p>
            {this.renderMoviesTable()}
        </div>;
    }

    private renderMoviesTable() {
        return <table className='table'>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Director</th>
                    <th>Release Date</th>
                    <th>Box Office Gross</th>
                </tr>
            </thead>
            <tbody>
                {this.props.movies.map(movie =>
                    <tr key={movie.MovieID}  >
                        <td>{movie.Title}</td>
                        <td>{movie.Director}</td>
                        <td>{movie.ReleaseDate}</td>
                        <td>{movie.BoxOfficeGross}</td>
                    </tr>
                )}
            </tbody>
        </table>;
    }
    //<td><Link className='btn btn-default' to={`/moviedata/${movie.MovieID }`}></Link></td>
}

export default connect(
    (state: ApplicationState) => state.movies, // Selects which state properties are merged into the component's props
    MoviesState.actionCreators                 // Selects which action creators are merged into the component's props
)(MovieData) as typeof MovieData;
