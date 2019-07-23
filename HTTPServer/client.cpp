#include <sys/socket.h>
#include <netinet/in.h>
#include <string>
#include <arpa/inet.h>
#include <unistd.h>

#define PORT 8080

int main()
{
  int sock = 0; long valread;
  sockaddr_in serv_addr;
  memset(&serv_addr, '0', sizeof(serv_addr));
  std::string hello = "Hello from the client";
  char buffer[30000] = {0};
  if((sock = socket(AF_INET, SOCK_STREAM, 0)) < 0)
  {
    printf("\n Socket creation error \n");
    return -1;
  }

  serv_addr.sin_family = AF_INET;
  serv_addr.sin_port = htons(PORT);

  // Convert IPv4 and IPv6 addresses from string to binary form
  if(inet_pton(AF_INET, "127.0.0.1", &serv_addr.sin_addr) <= 0)
  {
    printf("\n Invalid address/ Address not supported \n");
    return -1;
  }

  if(connect(sock, (sockaddr *)&serv_addr, sizeof(serv_addr)) < 0)
  {
    printf("\n Connection failed \n");
    return -1;
  }

  send(sock, hello.c_str(), hello.length(), 0);
  printf("Hello message sent\n");
  valread = read(sock, buffer, 30000);
  printf("%s\n", buffer);
}
