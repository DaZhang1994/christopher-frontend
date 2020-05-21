import { AfterViewChecked, AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';


gql`
  type Query {
    post(postId: String!): Post!
  }
`

const Post = gql`
  query post($postId: String!) {
    post(postId: $postId) {
      title,
      content,
      author {
        firstName,
        lastName
      },
      createdTime
    }
  }
`;

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit, AfterViewInit, AfterViewChecked, OnDestroy {

  idSub: any;

  post: any;

  constructor(private route: ActivatedRoute, private apollo: Apollo) {
    this.idSub = this.route.params.subscribe(async (params: any) => {
      const { data: postRes }: any = await this.apollo
        .query({
          query: Post,
          variables: {
            postId: params.id,
          },
        })
        .toPromise();
      this.post = postRes.post;
    });
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {

  }

  ngAfterViewChecked(): void {

  }

  ngOnDestroy() {
    this.idSub.unsubscribe();
  }

}
