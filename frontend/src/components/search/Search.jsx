import React from 'react';
import './search.css';
import SideMenu from '../SideMenu/SideMenu';

export default function Search() {
    return (
        <>
            <SideMenu />
            <div className="container-msg">
                <div className="user-tab">
                    <div className="user-header">
                        <h2>Search people</h2>
                        <i class="bi bi-person-fill"></i>
                    </div>
                    <div className="search-bar">
                        <input
                            className="search-bar-component"
                            type="text"
                            placeholder="Search"
                        />
                        <i className="bi bi-search"></i>
                    </div>
                </div>

            </div>
        </>
    );
}
