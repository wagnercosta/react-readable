import React from 'react';
import { connect } from "react-redux";
import { fetchPosts, votePost } from "../actions/postsActions";
import { CardPost } from "./CardPost"
import { changeOrder } from "../actions/postsMainActions";



class Posts extends React.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
    }

    
    componentDidMount() {
      this.props.fetchPosts();
    }

    handleChange(event) {
      this.props.changeOrder(event.target.value);
    }

    votePost = (option, postId) => {
      this.props.votePost(option, postId, this.props.posts)
        .then((retorno) => {
          if(retorno.sucesso)
          {
            //this.props.fetchPosts();
          }
        });
    }
  
    render() {
      const { error, loading, posts, orderBy } = this.props;

      if (error) {
        return <div>Error! {error.message}</div>;
      }
  
      if (loading) {
        return <div>Loading...</div>;
      }
      
      let postsfiltered = posts.filter(p => (p.category == this.props.category || this.props.category == undefined));
      
      switch(orderBy) {
        case "dateAsc":
          sortAscByDate(postsfiltered);
          break;
        case "dateDesc":
          sortDescByDate(postsfiltered);
          break;
        case "voteAsc":
          sortAscByVote(postsfiltered);
          break;
        case "voteDesc":
          sortDescByVote(postsfiltered);
          break;
        default:
      }

    return (
      <div>
        <label>
          Order by:
          <select value={orderBy} className="ml-2" onChange={this.handleChange}>
            <option value="dateAsc">Older</option>
            <option value="dateDesc">Newest</option>
            <option value="voteAsc">Popular</option>
            <option value="voteDesc">Impopular</option>
          </select>
        </label>
        {postsfiltered.map(post => 
            <CardPost key={post.id} post={post} categories={this.props.categories} votePost={this.votePost} />
        )}
      </div>
  );
  };
}

const sortDescByVote = (posts) =>
{
  posts.sort(function (a, b) {
    if (a.voteScore > b.voteScore) {
      return 1;
    }
    if (a.voteScore < b.voteScore) {
      return -1;
    }
    return 0;
  });
}

const sortAscByVote = (posts) =>
{
  posts.sort(function (a, b) {
    if (a.voteScore < b.voteScore) {
      return 1;
    }
    if (a.voteScore > b.voteScore) {
      return -1;
    }
    return 0;
  });
}

const sortAscByDate = (posts) =>
{
  posts.sort(function (a, b) {
    if (a.timestamp > b.timestamp) {
      return 1;
    }
    if (a.timestamp < b.timestamp) {
      return -1;
    }
    return 0;
  });
}

const sortDescByDate = (posts) =>
{
  posts.sort(function (a, b) {
    if (a.timestamp < b.timestamp) {
      return 1;
    }
    if (a.timestamp > b.timestamp) {
      return -1;
    }
    return 0;
  });
}

const mapStateToProps = state => ({
  posts: state.posts.items,
  loading: state.posts.loading,
  error: state.posts.error,
  orderBy: state.order.orderBy,
});


const mapDispatchToProps = dispatch => ({
  fetchPosts: () => dispatch(fetchPosts()),
  votePost: (option, id, allPosts) => dispatch(votePost(option, id, allPosts)),
  changeOrder: (order) => dispatch(changeOrder(order))
});



export default connect(mapStateToProps, mapDispatchToProps)(Posts);
