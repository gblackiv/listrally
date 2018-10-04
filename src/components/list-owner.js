import React from 'react';

export default class List{
    render(){
        (    
            <div class="container">
                <!-- Top Navigation -->
                <div class="nav">
                    <i class="fas fa-chevron-left"></i>
                    <i class="fas fa-link"></i>
                </div>
                
                <!-- User Avatar -->
                <i class="fas fa-user"></i>
        
                <!-- Main Content -->
                <div class="listContent">
                    <!-- List name, details, and filter button -->
                    <div class="top">
                        <br>
                        <h1 class="list-name">Aunt Sue's Party</h1>
                        <h4 class="details">Saturday April 1st</h4>
                    </div>
                    <!-- Items -->
                    <div class="items">
                        <div class="item">
                            <div class="left">
                                <i class="fas fa-sort"></i>
                                <label>Chips</label>
                            </div>
                            <div class="right">
                                <i class="fas fa-pen"></i>
                                <i class="fas fa-trash-alt"></i>
                            </div>
                        </div>
                        <div class="item">
                            <div class="left">
                                <i class="fas fa-sort"></i>
                                <label>Beer</label>
                            </div>
                            <div class="right">
                                <i class="fas fa-pen"></i>
                                <i class="fas fa-trash-alt"></i>
                            </div>
                        </div>
                        <div class="item">
                            <div class="left">
                                <i class="fas fa-sort"></i>
                                <label>Plastic forks</label>
                            </div>
                            <div class="right">
                                <i class="fas fa-pen"></i>
                                <i class="fas fa-trash-alt"></i>
                            </div>
                        </div>
                        <div class="item">
                            <div class="left">
                                <i class="fas fa-sort"></i>
                                <label>Cups</label>
                            </div>
                            <div class="right">
                                <i class="fas fa-pen"></i>
                                <i class="fas fa-trash-alt"></i>
                            </div>
                        </div>
                        <div class="item">
                            <div class="left">
                                <i class="fas fa-sort"></i>
                                <label>Soda</label>
                            </div>
                            <div class="right">
                                <i class="fas fa-pen"></i>
                                <i class="fas fa-trash-alt"></i>
                            </div>
                        </div>
                        <br>
                        <!-- Add List Button -->
                        <div class="item add modal-trigger">
                            <i class="fas fa-plus-circle"></i>
                            <label class="add">Add Item</label>
                        </div>
                    </div>
                </div>
                <!-- Footer -->
                <div class="footer">
                    <!-- <i class="fas fa-dollar-sign"></i> -->
                    <i class="fas fa-comments"></i>
                </div>
        
                <!--MODAL-->
                <div class="flex align-center align-vert modal modal-align container">
                    <div class="modal-container">
                        <header class="modal-header">
                            <h1>Add Item</h1>
                            <a class="modalClose modalCloseX" aria-hidden="true">&#x2715;</a>
                        </header>
                        <div class="main">
                            <input class="add-input" type="text" name="sauce"/>
                        </div>
                        <footer class="modal-footer">
                            <div class="modal-buttons">
                                <button class="modalClose modalCloseBtn">Cancel</button>
                                <button class="modalClose modalCloseBtn">OK</button>
                            </div>
                        </footer>
                    </div>
                </div>
            <
        )
    }
}
