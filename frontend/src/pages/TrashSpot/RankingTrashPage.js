import React, { useState,useEffect } from "react";
import axios from "axios";

function RankingTrashPage(props) {

  return (
    <>
      <div className="rankingTrashPage">
        <div className="d-flex justify-content-center">
          <h2>This is the ranking of last 7 days!</h2>
        </div>
        <div class="table-respondsive">
            
          <table  class="table">
            <thead class="text-primary">
                <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Trash Posted</th>
                <th>Trash Collected</th>
                <th>Score</th>
                </tr>
            </thead>
            <tbody>
            {props.rankingPersons.map((person,index) => (
                <tr key={person.id}>
                    <td>{index+1}</td>
                    <td>{person.firstName} {person.lastName}</td>
                    <td>{person.countPostedTrash}</td>
                    <td>{person.countCollectedTrash}</td>
                    <td>{person.totalPoints}</td>
                </tr>))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default RankingTrashPage;
