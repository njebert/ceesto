import { fetch, addTask } from 'domain-task';
import { Action, Reducer, ActionCreator } from 'redux';
import { AppThunkAction } from './';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface MoviesState {
    isLoading: boolean;
    movieID?: number;
    movies: Movie[];
}

export interface Movie {
    movieID: number;
    title: string;
    director: string;
    releaseDate: string;
    boxOfficeGross: string;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface RequestMoviesAction {
    type: 'REQUEST_MOVIES';
    movieID: number;
}

interface ReceiveMoviesAction {
    type: 'RECEIVE_MOVIES';
    movieID: number;
    movies: Movie[];
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = RequestMoviesAction | ReceiveMoviesAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    requestMovies: (movieID: number): AppThunkAction<KnownAction> => (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        if (movieID !== getState().movies.movieID) {
            //
            // Raw dispatch testing...
            //
            // dispatch({
            //     type: 'RECEIVE_MOVIES', movieID: movieID,
            //     movies: [{
            //         MovieID: 1,
            //         Title: "Star Wars: The Last Jedi",
            //         Director: "Rian Johnson",
            //         ReleaseDate: "December 15th, 2017",
            //         BoxOfficeGross: "$250,000,000"
            //     }]
            // });

            let fetchTask = fetch(`api/SampleData/Movies?movieID=${movieID}`)
                .then(response => response.json() as Promise<Movie[]>)
                .then(data => {
                    console.log("data: " + data);
                    dispatch({
                        type: 'RECEIVE_MOVIES',
                        movieID: movieID,
                        movies: data
                    });
                });
            addTask(fetchTask); // Ensure server-side prerendering waits for this to complete
            dispatch({ type: 'REQUEST_MOVIES', movieID: movieID });
        }
    }
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

// Setting movieID in unloadedState to be -1 to allow for movieID 0 to return all results
const unloadedState: MoviesState = { movies: [], isLoading: false, movieID: -1 };

export const reducer: Reducer<MoviesState> = (state: MoviesState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_MOVIES':
            return {
                movieID: action.movieID,
                movies: state.movies,
                isLoading: true
            };
        case 'RECEIVE_MOVIES':
            if (action.movieID === state.movieID) {
                return {
                    movieID: action.movieID,
                    movies: action.movies,
                    isLoading: false
                };
            }
            break;
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
};
