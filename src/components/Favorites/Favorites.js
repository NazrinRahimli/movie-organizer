import React, { Component } from 'react';
import './Favorites.css';
import { connect } from 'react-redux';
import { removeMovieFromFavorites, postFavorites } from '../../redux/actions';
import { Link } from 'react-router-dom';

class Favorites extends Component {
    state = {
        listName: '',
        isClicked: false
    }
    listNameChangeHandler = (event) => {
        this.setState({ listName: event.target.value });
    }
    getImdbIDArray = () => {
        let favouritesIDArray = this.props.favorites.map((item) => {
            return item.imdbID;
        })
        return favouritesIDArray;
    }

    saveListHandler = () => {
        this.setState({ isClicked: true });
        this.props.postFavorites(this.state.listName, this.getImdbIDArray());
    }

    render() { 
        return (
            <div className="favorites">
                <input 
                    placeholder="New List" 
                    className="favorites__name"
                    disabled={this.state.isClicked}
                    onChange={this.listNameChangeHandler} 
                    />
                <ul className="favorites__list">
                    {this.props.favorites.map((item) => {
                        return <li key={item.imdbID}>
                            {item.Title} ({item.Year})
                            <button 
                                className="favorites__delete"
                                onClick={() => this.props.removeMovieFromFavorites(item.imdbID)}>
                                    <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="26px" height="26px">
                                    <path fill="#f44336" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"/>
                                    <path fill="#fff" d="M29.656,15.516l2.828,2.828l-14.14,14.14l-2.828-2.828L29.656,15.516z"/>
                                    <path fill="#fff" d="M32.484,29.656l-2.828,2.828l-14.14-14.14l2.828-2.828L32.484,29.656z"/>
                                    </svg>
                            </button>
                            </li>;
                    })}
                </ul>
                {!this.state.isClicked ? <button type="button" className="favorites__save" onClick={this.saveListHandler}>Save the list</button> 
                : <Link to={'/list/' + this.props.listID} target="_blank">Go to selected movies</Link>}
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    removeMovieFromFavorites: (imdbID) => dispatch(removeMovieFromFavorites(imdbID)),
    postFavorites: (listName, favouritesIDArray) => dispatch(postFavorites(listName, favouritesIDArray))
  });
const mapStateToProps = (state) => {
    return {
        favorites: state.favorites,
        listID: state.listID
    }
  };
export default connect(mapStateToProps, mapDispatchToProps)(Favorites);