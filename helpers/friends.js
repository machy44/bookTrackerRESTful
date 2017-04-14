const friends = [];

function getFriends() {
    var item = {};

    item = {};
    item.name = 'mildred';
    item.email = 'mildred@example.com';
    item.blog = 'http://example.com/blogs/mildred';
    friends.push(item);

    item = {};
    item.name = 'mike';
    item.email = 'mike@example.com';
    item.blog = 'http://example.com/blogs/mike';
    friends.push(item);

    item = {};
    item.name = 'mary';
    item.email = 'mary@example.com';
    item.blog = 'http://example.com/blogs/mary';
    friends.push(item);

    item = {};
    item.name = 'mark';
    item.email = 'mark@example.com';
    item.blog = 'http://example.com/blogs/mark';
    friends.push(item);

    item = {};
    item.name = 'muffin';
    item.email = 'muffin@example.com';
    item.blog = 'http://example.com/blogs/muffin';
    friends.push(item);
}

module.exports = friends;
