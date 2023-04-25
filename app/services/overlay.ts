import Service from '@ember/service';

export default class OverlayService extends Service {
  url = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIHhtbDpzcGFjZT0icHJlc2VydmUiIHZpZXdCb3g9IjAgMCAxMDIyIDEwMjEiIHdpZHRoPSIxOTIwIiBoZWlnaHQ9IjE5MTguMTIxMzMwNzI0MDcwNSIgc3R5bGU9InBvc2l0aW9uOiBhYnNvbHV0ZTsgY3Vyc29yOiB0ZXh0OyI+PGcgZGF0YS1zaGFyaW5waXgtdHlwZT0iY2lyY2xlIiBzdHlsZT0ic3Ryb2tlOiByZ2IoMjMxLCA3NiwgNjApOyBmaWxsOiByZ2JhKDIzMSwgNzYsIDYwLCAwKTsgc3Ryb2tlLXdpZHRoOiAyMi45NzlweDsiIGRhdGEtc2hhcmlucGl4LWlkPSI0OGUxYmQ1MC00NjM1LTQyZTctYTZmMC1hY2I0NjU2Njg2MTUiPjxjaXJjbGUgY3g9IjUwNC43NTc1NjQ5OTk5OTk5IiBjeT0iNTI1LjQ3NDY2NCIgc3R5bGU9InN0cm9rZS1saW5lY2FwOiByb3VuZDsiIHI9IjM4NC4zNjg2MTExNDA2MzU4MyI+PC9jaXJjbGU+PC9nPjxnIHRyYW5zZm9ybT0ibWF0cml4KDIuMTEwNDE0ODE1ODk2NDcyLCAtMC4zNTQ5OTQ0NTk1MTgzMzU2NCwgMC4zNTQ5OTQ3MDU4MDA5ODM0LCAyLjExMDQxNjI4MDAyNzkwOSwgNDQ3LjU0MTM4OTI2ODIxMDQsIDQ1LjYyNDM1ODgzMTg3MzIpIiBkYXRhLXNoYXJpbnBpeC10eXBlPSJ0ZXh0IiBzdHlsZT0iZmlsbDogcmdiKDIzMSwgNzYsIDYwKTsgc3Ryb2tlOiByZ2IoMjMxLCA3NiwgNjApOyIgZGF0YS1zaGFyaW5waXgtaWQ9IjU3N2RlY2FjLTI4ZmItNGE3OS05NjFlLWU2ODUyZWY5NTViNCI+PHJlY3Qgc3Ryb2tlLXdpZHRoPSIwIiBzdHlsZT0iZmlsbDogcmdiYSgyMzYsIDI0MCwgMjQxLCAwKTsiIHg9Ii0xODAuMDU1ODkyOTQ0MzM1OTQiIHk9Ii0xMy43ODg5MzE4NDY2MTg2NTIiIHdpZHRoPSIzNjAuMTM5MTI5NjM4NjcxOSIgaGVpZ2h0PSI0My4xOTA3NzY4MjQ5NTExNyI+PC9yZWN0Pjx0ZXh0IHN0cm9rZS13aWR0aD0iMCIgZm9udC1zaXplPSIzMHB4IiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiI+PHRzcGFuIGR5PSIxLjJlbSIgeD0iLTE3Ni4wNTU4OTI5NDQzMzU5NCIgeT0iLTE3LjgzMTgxMzgxMjI1NTg2Ij5GcmVuY2ggVG91Y2ggRHJlYW1pbmc8L3RzcGFuPjwvdGV4dD48L2c+PGcgdHJhbnNmb3JtPSJtYXRyaXgoMi42NTE1ODIzODIzNDIxOTAyLCAtMS40NTY0MjY3NTUxMDk1OTM3LCAxLjQ1NjQyNzc2NTUyNzE1NzgsIDIuNjUxNTg0MjIxOTE2NjE3LCA3NjUuNjU0NjQ1MDM2MDk3MywgODc0LjUzMzg0MjI2OTE5MTMpIiBkYXRhLXNoYXJpbnBpeC10eXBlPSJ0ZXh0IiBzdHlsZT0iZmlsbDogcmdiKDIzMSwgNzYsIDYwKTsgc3Ryb2tlOiByZ2IoMjMxLCA3NiwgNjApOyIgZGF0YS1zaGFyaW5waXgtaWQ9Ijg5ZjkzM2IxLWVjNTktNGNlYy04MDk5LTkwYjQzY2I2MDE2NSI+PHJlY3Qgc3Ryb2tlLXdpZHRoPSIwIiBzdHlsZT0iZmlsbDogcmdiYSgyMzYsIDI0MCwgMjQxLCAwKTsiIHg9Ii03My44MTkwOTE3OTY4NzUiIHk9Ii0xMy43ODg5MzE4NDY2MTg2NTIiIHdpZHRoPSIxNDcuNjQyMjI3MTcyODUxNTYiIGhlaWdodD0iNDMuMTkwNzc2ODI0OTUxMTciPjwvcmVjdD48dGV4dCBzdHJva2Utd2lkdGg9IjAiIGZvbnQtc2l6ZT0iMzBweCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiPjx0c3BhbiBkeT0iMS4yZW0iIHg9Ii02OS44MTkwOTE3OTY4NzUiIHk9Ii0xNy44MzE4MTM4MTIyNTU4NiI+U2hhcmluUGl4PC90c3Bhbj48L3RleHQ+PC9nPjwvc3ZnPgo=';
}

// Don't remove this declaration: this is what enables TypeScript to resolve
// this service using `Owner.lookup('service:overlay')`, as well
// as to check when you pass the service name as an argument to the decorator,
// like `@service('overlay') declare altName: OverlayService;`.
declare module '@ember/service' {
  interface Registry {
    'overlay': OverlayService;
  }
}
