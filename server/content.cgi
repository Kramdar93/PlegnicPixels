#!/usr/bin/perl
use strict;
use warnings;
use Cwd;
use CGI;

my $contentFolder = cwd.'/content';
my $q = CGI->new;
$q or sendResponse('bad state: could not create CGI object!');
#$ARGV > 0 or sendResponse('bad state: could not create CGI object!'); #local testing only

sub sendResponse{
    print @_[0];
    return;
}

sub getFilesInFolder{
    my $folder = @_[0];
    my $limit = @_[1];
    my $res = "";
    my $i = 0;
    
    opendir(my $dir, "$contentFolder/$folder") or sendResponse("$contentFolder/$folder: $!");

    while (my $filename = readdir($dir) and ($limit < 0 or $i < $limit) ) {
        ($filename ne '.' and $filename ne '..') or next;
        
        if ($i != 0){
            $res = "$res,";
        }

        open(my $file, "$contentFolder/$folder/$filename") or next;

        while (my $row = <$file>) {
            $res = "$res $row";
        }

        close($file);
        $i = $i + 1;
    }
    
    closedir($dir);
    
    return $res;
}

my $result = "";      # string to store result
my $type = $q->url_param('type');  # what to get
#$type or $type = @ARGV[0]; #testing fallback

if( $type eq 'peel' ){
    #get only the first few of game and blog
    $result = "{ \"games\": [".getFilesInFolder('game',10)."], \"blogs\": [".getFilesInFolder('blog',10)."] }";
}
elsif( $type eq 'game' ||
        $type eq 'blog' ||
        $type eq 'about' ||
        $type eq 'contributor'  ){
    #get all of designated folder
    $result = "[ ".getFilesInFolder($type,-1)." ]";
}
else{
    if($type){
        $result = "unknown type: $type";
    }
    else{
        $result = "no parameter of name 'type'";
    }
}

sendResponse($result);
