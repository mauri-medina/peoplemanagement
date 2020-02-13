import { Component, OnInit, Input } from '@angular/core';
import { Candidate } from 'src/app/models/candidate';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-candidate',
  templateUrl: './card-candidate.component.html',
  styleUrls: ['./card-candidate.component.css']
})
export class CardCandidateComponent implements OnInit {

  @Input() candidate: Candidate = null;
  hover: boolean = false; // true when the cursor is over the component

  constructor(private router: Router) { }

  ngOnInit() {
    console.log(this.candidate);
  }

  // go to candidate profile page
  onClick() {
    let url = '/candidate/data/';
    if (this.candidate) url += this.candidate.id;
    this.router.navigateByUrl(url);
  }

  // should return a string no longer than 16 characters
  get candidateName(): string {
    let name: string = this.candidate ? `${this.candidate.name} ${this.candidate.lastName}`.trim() : '-';
    if (name.length > 16) name = `name.substr(0, 13)...`;
    return name;
  }

  get statusChallenge(): string {
    const stch = this.candidate ? this.candidate.process_challenge_status : '';
    if (stch.match(/pending/i)) return 'pending';
    if (stch.match(/pro/i)) return 'in_process';
    if (stch.match(/completed/i)) return 'completed';
    return 'undefined';
  }

  get statusInterview(): string {
    const stint = this.candidate ? this.candidate.interviewStatus : '';
    if (stint.match(/pending/i)) return 'pending';
    if (stint.match(/pro/i)) return 'in_process';
    if (stint.match(/completed/i)) return 'completed';
    return 'undefined';
  }

}
